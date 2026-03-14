export function ChatInput({ input, onInputChange, onSubmit, isGenerating, onPhotoSelect, hasPhoto }) {
  return (
    <form className="chat-input-wrap" onSubmit={onSubmit}>
      <div className="chat-input-inner">
        {!hasPhoto && (
          <label className="chat-photo-btn" aria-label="Add your photo">
            <input
              type="file"
              accept="image/*"
              className="chat-photo-input"
              onChange={(e) => onPhotoSelect?.(e.target.files?.[0])}
            />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </label>
        )}
        <input
          type="text"
          className="chat-input"
          placeholder="Describe the outfit you want to try..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={isGenerating}
          autoFocus
        />
        <button
          type="submit"
          className="chat-send"
          aria-label="Send"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <span className="chat-send-spinner" />
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          )}
        </button>
      </div>
    </form>
  )
}
