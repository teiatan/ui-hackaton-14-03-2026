import { fal } from '@fal-ai/client'

fal.config({
  credentials: import.meta.env.VITE_FAL_KEY,
})

export { fal }
