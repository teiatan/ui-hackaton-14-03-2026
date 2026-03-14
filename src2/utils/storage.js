import { CHAT_STORAGE_KEY, STORAGE_KEY } from '../config/constants'

export const DEFAULT_MESSAGES = [
  {
    role: 'assistant',
    content: 'Hi! Drop your photo here to try outfits on yourself, or just describe the look. For example: "A black leather jacket with white sneakers". I\'ll generate 3 variations.',
  },
]

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function loadChatHistory() {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY)
    if (!raw) return DEFAULT_MESSAGES
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MESSAGES
  } catch {
    return DEFAULT_MESSAGES
  }
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
