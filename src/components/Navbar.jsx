import { useState, useEffect } from 'react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = LINKS.map((l) => l.href.slice(1))
      const headerH = 80
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const top = el.offsetTop - headerH
          if (window.scrollY >= top && window.scrollY < top + el.offsetHeight) {
            setActiveId(sections[i])
            return
          }
        }
      }
      setActiveId('')
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="site-header"
      id="site-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.25rem 3rem',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,229,255,0.08)' : '1px solid transparent',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
      }}
    >
      <nav className="nav" style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }} aria-label="Main">
        <a href="#hero" className="nav-logo" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem', background: 'linear-gradient(to right, #00e5ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>MS</a>
        <ul
          className={`nav-links ${mobileOpen ? 'open' : ''}`}
          style={{
            alignItems: 'center',
            gap: '3rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={activeId === href.slice(1) ? 'active' : ''}
                style={{
                  color: activeId === href.slice(1) ? 'var(--cyan)' : 'var(--text-muted)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="/M.Saad_RESUME.pdf" download style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Resume</a>
          </li>
        </ul>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 6,
            padding: 8,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text)',
          }}
        >
          <span style={{ display: 'block', width: 22, height: 2, background: 'currentColor', borderRadius: 1 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'currentColor', borderRadius: 1 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'currentColor', borderRadius: 1 }} />
        </button>
      </nav>
      <style>{`
        @media (max-width: 768px) {
          .nav-toggle { display: flex !important; }
          .nav-links:not(.open) { display: none !important; }
          .nav-links.open { display: flex !important; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; gap: 0; padding: 1.25rem; background: rgba(10,10,10,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,229,255,0.1); }
          .nav-links.open li { padding: 0.75rem 0; border-bottom: 1px solid var(--border); }
          .nav-links.open li:last-child { border-bottom: none; }
        }
        @media (min-width: 769px) { .nav-links { display: flex !important; } }
        .nav-links a:hover { color: var(--cyan); }
      `}</style>
    </header>
  )
}
