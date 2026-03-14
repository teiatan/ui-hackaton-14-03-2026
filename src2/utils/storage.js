import { CHAT_STORAGE_KEY, STORAGE_KEY, QUIZ_STORAGE_KEY } from '../config/constants'

export const DEFAULT_MESSAGES = [
  {
    role: 'assistant',
    content: 'Hi! Drop your photo here to try outfits on yourself, or just describe the look. For example: "A black leather jacket with white sneakers". I\'ll generate 3 variations.',
  },
]

function loadQuizAnswers() {
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return null
    const withAnswers = parsed.filter((item) => item?.answer?.trim())
    if (withAnswers.length === 0) return null
    return withAnswers
  } catch {
    return null
  }
}

function buildQuizChatMessages(quizAnswers) {
  const qaPairs = quizAnswers.flatMap((item) => [
    { role: 'assistant', content: item.question },
    { role: 'user', content: item.answer },
  ])

  const styleHint = quizAnswers.find(
    (a) => a.question?.toLowerCase().includes('style') && a.answer
  )?.answer
  const occasionsHint = quizAnswers.find(
    (a) => a.question?.toLowerCase().includes('outfits for') && a.answer
  )?.answer

  let assistantContent =
    "Hi! I've noted your style profile. Drop your photo here to try outfits on yourself, or describe the look you want."
  if (styleHint || occasionsHint) {
    const parts = []
    if (styleHint) parts.push(`Your style: ${styleHint}`)
    if (occasionsHint) parts.push(`Occasions: ${occasionsHint}`)
    assistantContent = `Hi! Based on your profile (${parts.join(', ')}), drop your photo or describe a look. For example: "A black leather jacket with white sneakers". I'll generate 3 variations tailored to you.`
  }

  const assistantMessage = {
    role: 'assistant',
    content: assistantContent,
  }

  return [...qaPairs, assistantMessage]
}

/** Перетворює старий формат "My style profile:\nQ1: A1\nQ2: A2" на окремі повідомлення */
function parseOldStyleProfileBlock(content) {
  if (!content?.includes('My style profile:\n')) return null
  const lines = content.replace(/^My style profile:\n/, '').trim().split('\n')
  const messages = []
  for (const line of lines) {
    const colonIdx = line.indexOf(': ')
    if (colonIdx <= 0) continue
    const question = line.slice(0, colonIdx).trim()
    const answer = line.slice(colonIdx + 2).trim()
    if (question && answer) {
      messages.push({ role: 'assistant', content: question })
      messages.push({ role: 'user', content: answer })
    }
  }
  return messages.length > 0 ? messages : null
}

export function loadChatHistory() {
  const quizAnswers = loadQuizAnswers()
  const hasQuizProfile = quizAnswers && quizAnswers.length > 0

  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    const savedMessages = Array.isArray(parsed) && parsed.length > 0 ? parsed : null

    if (hasQuizProfile && !savedMessages) {
      return buildQuizChatMessages(quizAnswers)
    }

    if (hasQuizProfile && savedMessages) {
      const isDefaultOnly =
        savedMessages.length === 1 &&
        savedMessages[0].role === 'assistant' &&
        savedMessages[0].content?.includes('Drop your photo')
      if (isDefaultOnly) {
        return buildQuizChatMessages(quizAnswers)
      }
    }

    if (savedMessages) {
      const firstUser = savedMessages.find((m) => m.role === 'user')
      if (firstUser?.content?.includes('My style profile:\n')) {
        const parsedUserMsgs = parseOldStyleProfileBlock(firstUser.content)
        if (parsedUserMsgs?.length > 0) {
          const afterFirstUser = savedMessages.indexOf(firstUser) + 1
          const rest = savedMessages.slice(afterFirstUser)
          return [...parsedUserMsgs, ...rest]
        }
      }
    }

    return savedMessages || DEFAULT_MESSAGES
  } catch {
    return hasQuizProfile && quizAnswers
      ? buildQuizChatMessages(quizAnswers)
      : DEFAULT_MESSAGES
  }
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function saveChatHistory(messages) {
  try {
    const toSave = messages
      .filter((m) => !m.isLoading)
      .map((m) => ({
        role: m.role,
        content: m.content,
        photoData: m.photoData || null,
        imageUrls: m.imageUrls || null,
      }))
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(toSave))
  } catch (e) {
    console.warn('Failed to save chat:', e)
  }
}

export function loadGeneratedHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return parsed.map((item) =>
      typeof item === 'string' ? { url: item, prompt: '', timestamp: 0 } : item
    )
  } catch {
    return []
  }
}

export function saveGeneratedHistory(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.warn('Failed to save history:', e)
  }
}
