import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Gallery({ generatedImages }) {
  const items = [...(generatedImages || [])].reverse()
  const [previewItem, setPreviewItem] = useState(null)

  const closePreview = useCallback(() => setPreviewItem(null), [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closePreview()
    }
    if (previewItem) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [previewItem, closePreview])

  if (items.length === 0) {
    return (
      <div className="content-inner content-inner--centered">
        <h1>Gallery</h1>
        <p className="subtitle">All your generated looks in one place.</p>
        <div className="dashboard-empty">
          <p>No generated images yet.</p>
          <p>Go to Outfit Chat and create your first look!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Gallery</h1>
        <p className="subtitle">Your generated looks ({items.length} total)</p>
      </div>
      <div className="dashboard-grid">
        {items.map((item, i) => (
          <button
            key={`${item.url}-${i}`}
            type="button"
            className="dashboard-card"
            onClick={() => setPreviewItem(item)}
          >
            <img src={item.url} alt={item.prompt || 'Generated look'} />
            {item.prompt && <span className="dashboard-card-prompt">{item.prompt}</span>}
          </button>
        ))}
      </div>
      {previewItem &&
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
              src={previewItem.url}
              alt={previewItem.prompt || 'Preview'}
              onClick={(e) => e.stopPropagation()}
            />
            {previewItem.prompt && (
              <p className="chat-image-preview-prompt">{previewItem.prompt}</p>
            )}
          </div>,
          document.body
        )}
    </div>
  )
}
