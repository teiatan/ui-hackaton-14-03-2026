import './App.css'
import { useState, useCallback } from 'react'
import { PAGES } from './config/constants'
import { loadGeneratedHistory, saveGeneratedHistory } from './utils/storage'
import { Sidebar } from './components/Sidebar/Sidebar'
import { ChatInterface } from './components/Chat'
import { Gallery } from './pages/Gallery'
import { PlaceholderPage } from './pages/Placeholder'

function App() {
  const [activePageId, setActivePageId] = useState('ai-style-chat')
  const [generatedImages, setGeneratedImages] = useState(loadGeneratedHistory)
  const activePage = PAGES.find((p) => p.id === activePageId)
  const isChatTab = activePageId === 'ai-style-chat'
  const isDashboardTab = activePageId === 'dashboard'

  const handleImagesGenerated = useCallback((urls, prompt) => {
    const newItems = (urls || []).map((url) => ({ url, prompt, timestamp: Date.now() }))
    setGeneratedImages((prev) => {
      const next = [...prev, ...newItems]
      saveGeneratedHistory(next)
      return next
    })
  }, [])

  return (
    <div className="app">
      <Sidebar activePageId={activePageId} onNavClick={setActivePageId} />

      <div className="main-area">
        <main className={`content ${isChatTab ? 'content--chat' : ''} ${isDashboardTab ? 'content--dashboard' : ''}`}>
        {isChatTab && <ChatInterface onImagesGenerated={handleImagesGenerated} />}
        {isDashboardTab && <Gallery generatedImages={generatedImages} />}
        {!isChatTab && !isDashboardTab && <PlaceholderPage page={activePage} />}
        </main>
      </div>
    </div>
  )
}

export default App
