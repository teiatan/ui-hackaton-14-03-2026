export function ChatInput({ input, onInputChange, onSubmit, isGenerating }) {
  return (
    <form className="chat-input-wrap" onSubmit={onSubmit}>
      <div className="chat-input-inner">
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
