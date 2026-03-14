import { PAGES } from '../../config/constants'

export function Sidebar({ activePageId, onNavClick }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo-dot" />
        <span className="logo-text">CAPSULE</span>
      </div>

      <nav className="nav">
        {PAGES.map((page) => (
          <button
            key={page.id}
            type="button"
            className={`nav-item ${page.id === activePageId ? 'nav-item--active' : ''}`}
            onClick={() => onNavClick(page.id)}
          >
            {page.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
