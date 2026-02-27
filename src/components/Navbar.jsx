import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom' // Added these

const LINKS = [
  { path: '/', label: 'About', hash: '#about' },
  { path: '/work', label: 'Work' }, // This now points to the new page
  { path: '/', label: 'Skills', hash: '#skills' },
  { path: '/', label: 'Contact', hash: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation() // Detects which page we are on

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Helper to handle scrolling to sections when on the Home page
  const handleScroll = (hash) => {
    setMobileOpen(false)
    if (location.pathname === '/') {
      const el = document.querySelector(hash)
      if (el) {
        const headerH = 80
        window.scrollTo({ top: el.offsetTop - headerH, behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className="site-header"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '1.25rem 3rem',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,229,255,0.08)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <nav className="nav" style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="nav-logo" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem', background: 'linear-gradient(to right, #00e5ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>MS</Link>
        
        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '3rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {LINKS.map(({ path, label, hash }) => (
            <li key={label}>
              <Link
                to={path + (hash || '')}
                style={{
                  color: (location.pathname === path && !hash) ? 'var(--cyan)' : 'var(--text-muted)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }}
                onClick={() => hash ? handleScroll(hash) : setMobileOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a href="/M.Saad_RESUME.pdf" download style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Resume</a>
          </li>
        </ul>

        {/* Hamburger Mobile Toggle */}
        <button className="nav-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', flexDirection: 'column', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
          <span style={{ display: 'block', width: 22, height: 2, background: 'currentColor', borderRadius: 1 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'currentColor', borderRadius: 1 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'currentColor', borderRadius: 1 }} />
        </button>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-toggle { display: flex !important; }
          .nav-links:not(.open) { display: none !important; }
          .nav-links.open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; padding: 1.25rem; background: rgba(10,10,10,0.95); backdrop-filter: blur(12px); }
        }
        .nav-links a:hover { color: var(--cyan) !important; }
      `}</style>
    </header>
  )
}
