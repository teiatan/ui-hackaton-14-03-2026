const DEFAULT_PROMPT = `ROLE: You are an elite AI Fashion Stylist. Preserve the user's identity 100% - no face/body changes. Only change clothing and accessories. Same person, same pose, same background.`

export function buildStylePrompt(userInput) {
  return `${DEFAULT_PROMPT} ${userInput}`
}

export function buildImg2ImgPrompt(userInput) {
  return `${DEFAULT_PROMPT} ${userInput}`
}
