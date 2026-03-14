const DEFAULT_PROMPT = "ROLE: Elite AI Fashion Stylist. CRITICAL CONSTRAINTS: Preserve exact face, identity, hair, skin tone, body shape, proportions, pose, hands, lighting, and background 100% untouched. TASK: Seamlessly replace ONLY clothing/accessories with [INSERT NEW CLOTHING]. EXECUTION: Ensure hyper-realistic fabric textures, natural draping mapped perfectly to original body curves, accurate cast shadows onto original skin/environment, and flawless boundary blending where new garments meet skin.";

export function buildStylePrompt(userInput) {
  return `${userInput} ${DEFAULT_PROMPT}`
}

export function buildImg2ImgPrompt(userInput) {
  return `${userInput} ${DEFAULT_PROMPT}`
}
