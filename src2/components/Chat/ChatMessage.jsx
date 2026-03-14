import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

export function ChatMessage({ msg }) {
  const [previewUrl, setPreviewUrl] = useState(null)

  const closePreview = useCallback(() => setPreviewUrl(null), [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closePreview()
    }
    if (previewUrl) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [previewUrl, closePreview])

  return (
    <div className={`chat-message chat-message--${msg.role}`}>
      <div className="chat-message-avatar">
        {msg.role === 'user' ? 'U' : 'AI'}
      </div>
      <div className="chat-message-content">
        {msg.content}
        {msg.isLoading && (
          <span className="chat-loading-dots">
            <span /><span /><span />
          </span>
        )}
        {(msg.photoUrl || msg.photoData) && (
          <div className="chat-message-user-photo">
            <img src={msg.photoUrl || msg.photoData} alt="Your photo" />
            <span className="chat-message-user-photo-label">+ your photo</span>
          </div>
        )}
        {msg.imageUrls?.length > 0 && (
          <div className="chat-image-cards">
            {msg.imageUrls.map((url, j) => (
              <button
                key={j}
                type="button"
                className="chat-image-card"
                onClick={() => setPreviewUrl(url)}
              >
                <img src={url} alt={`Generated outfit ${j + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
      {previewUrl &&
        createPortal(
          <div className="chat-image-preview" onClick={closePreview} role="presentation">
            <button
              type="button"
              className="chat-image-preview-close"
              onClick={closePreview}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={previewUrl}
              alt="Preview"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </div>
  )
}
