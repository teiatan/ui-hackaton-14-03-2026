export function Gallery({ generatedImages }) {
  const items = [...(generatedImages || [])].reverse()

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
          <a
            key={`${item.url}-${i}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-card"
          >
            <img src={item.url} alt={item.prompt || 'Generated look'} />
            {item.prompt && <span className="dashboard-card-prompt">{item.prompt}</span>}
          </a>
        ))}
      </div>
    </div>
  )
}
