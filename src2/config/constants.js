export const STORAGE_KEY = 'ai-studio-generated-images'
export const CHAT_STORAGE_KEY = 'capsule-chat-history'

export const PAGES = [
  {
    id: 'dashboard',
    label: 'Gallery',
    description: 'All your generated looks in one place.',
  },
  {
    id: 'ai-style-chat',
    label: 'Outfit Chat',
    description: 'Chat with AI to generate images of you in the outfits you describe. Describe what you want to wear and get personalized visuals.',
  },
  {
    id: 'tattoo',
    label: 'Tattoo Try-On',
    description: 'Generate tattoo designs and preview them on your body in real-time. Try before you ink.',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    description: 'Try on hats, glasses, jewelry and more. See how accessories look on you before you buy.',
  },
  {
    id: 'hair',
    label: 'Hairstyles',
    description: 'Experiment with different hairstyles and colors. Visualize your new look instantly.',
  },
  {
    id: 'makeup',
    label: 'Makeup',
    description: 'Try different makeup styles and looks. See how lipstick, eyeshadow and more suit you.',
  },
]

export const FAL_TEXT_TO_IMAGE = 'fal-ai/flux/schnell'
export const FAL_IMAGE_TO_IMAGE = 'fal-ai/flux/dev/image-to-image'
