export function ChatMessage({ msg }) {
  return (
    <div className={`chat-message chat-message--${msg.role}`}>
      <div className="chat-message-avatar">
        {msg.role === 'user' ? 'U' : 'AI'}
      </div>
      <div className="chat-message-content">
        {msg.content}
        {msg.isLoading && (
          <span className="chat-loading-dots">
            <span /><span /><span />
          </span>
        )}
        {(msg.photoUrl || msg.photoData) && (
          <div className="chat-message-user-photo">
            <img src={msg.photoUrl || msg.photoData} alt="Your photo" />
            <span className="chat-message-user-photo-label">+ your photo</span>
          </div>
        )}
        {msg.imageUrls?.length > 0 && (
          <div className="chat-image-cards">
            {msg.imageUrls.map((url, j) => (
              <a
                key={j}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-image-card"
              >
                <img src={url} alt={`Generated outfit ${j + 1}`} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
