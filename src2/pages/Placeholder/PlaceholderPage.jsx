export function PlaceholderPage({ page }) {
  return (
    <div className="content-inner content-inner--centered">
      <h1>{page.label}</h1>
      <p className="subtitle">{page.description}</p>
      <div className="status-card">
        <span className="status-pill">Coming soon</span>
        <p className="status-text">This personalized tool is in development. Stay tuned.</p>
      </div>
    </div>
  )
}
