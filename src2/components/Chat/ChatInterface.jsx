import { useState, useCallback, useEffect } from 'react'
import { fal } from '../../lib/fal'
import { FAL_TEXT_TO_IMAGE, FAL_IMAGE_TO_IMAGE } from '../../config/constants'
import { buildStylePrompt, buildImg2ImgPrompt } from '../../utils/prompts'
import { fileToDataUrl, loadChatHistory, saveChatHistory } from '../../utils/storage'
import { ChatMessage } from './ChatMessage'
import { ChatDropzone } from './ChatDropzone'
import { ChatInput } from './ChatInput'

export function ChatInterface({ onImagesGenerated }) {
  const [messages, setMessages] = useState(loadChatHistory)
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [userPhoto, setUserPhoto] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null)

  const handlePhotoSelect = useCallback((file) => {
    if (!file?.type?.startsWith('image/')) return
    setUserPhoto(file)
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer?.files?.[0]
      handlePhotoSelect(file)
    },
    [handlePhotoSelect]
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleRemovePhoto = useCallback(() => {
    setUserPhoto(null)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    const photoData = userPhoto ? await fileToDataUrl(userPhoto) : null
    const userMessage = { role: 'user', content: input.trim(), photoData }
    const photoToUpload = userPhoto
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setUserPhoto(null)
    setIsGenerating(true)

    const loadingMessage = {
      role: 'assistant',
      content: photoToUpload ? 'Generating your look on your photo...' : 'Generating your look...',
      isLoading: true,
    }
    setMessages((prev) => [...prev, loadingMessage])

    try {
      let imageUrls = []

      if (photoToUpload) {
        const uploadedUrl = await fal.storage.upload(photoToUpload)
        const prompt = buildImg2ImgPrompt(userMessage.content)
        const result = await fal.subscribe(FAL_IMAGE_TO_IMAGE, {
          input: {
            image_url: uploadedUrl,
            prompt,
            num_images: 3,
            strength: 0.85,
          },
          logs: true,
        })
        imageUrls = (result.data?.images ?? []).map((img) => img.url).filter(Boolean)
      } else {
        const prompt = buildStylePrompt(userMessage.content)
        const result = await fal.subscribe(FAL_TEXT_TO_IMAGE, {
          input: {
            prompt,
            image_size: 'portrait_4_3',
            num_images: 3,
          },
          logs: true,
        })
        imageUrls = (result.data?.images ?? []).map((img) => img.url).filter(Boolean)
      }

      onImagesGenerated?.(imageUrls, userMessage.content)

      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? {
                role: 'assistant',
                content: 'Here\'s your look!',
                imageUrls,
              }
            : msg
        )
      )
    } catch (err) {
      console.error('fal.ai error:', err)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? {
                role: 'assistant',
                content: `Sorry, something went wrong: ${err.message || 'Failed to generate image'}. Please try again.`,
              }
            : msg
        )
      )
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (userPhoto) {
      const url = URL.createObjectURL(userPhoto)
      setPhotoPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPhotoPreviewUrl(null)
    }
  }, [userPhoto])

  useEffect(() => {
    saveChatHistory(messages)
  }, [messages])

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <ChatMessage key={i} msg={msg} />
        ))}
      </div>

      <div className="chat-input-section">
        <ChatDropzone
          userPhoto={userPhoto}
          photoPreviewUrl={photoPreviewUrl}
          isDragOver={isDragOver}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onPhotoSelect={handlePhotoSelect}
          onRemovePhoto={handleRemovePhoto}
        />
        <ChatInput
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  )
}
