import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import VariableProximity from './ui/VariableProximity'

const SUBTITLE = 'AI Student & Creative Designer'
const TYPE_MS = 50
const GLITCH_REMOVE_MS = 800

export default function Hero() {
  const [glitch, setGlitch] = useState(true)
  const [typed, setTyped] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setGlitch(false), GLITCH_REMOVE_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (glitch) return
    let i = 0
    const id = setInterval(() => {
      i++
      if (i <= SUBTITLE.length) {
        setTyped(SUBTITLE.slice(0, i))
      } else {
        setShowCursor(false)
        clearInterval(id)
      }
    }, TYPE_MS)
    return () => clearInterval(id)
  }, [glitch])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'hidden',
        background: 'transparent' // Explicitly transparent for Dark Veil
      }}
    >
      {/* THE GLASS CARD */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '950px',
          width: '100%',
          padding: '4rem 3.5rem',
          // Matches your glass settings
          background: 'rgba(255, 255, 255, 0.07)', 
          backdropFilter: 'blur(12px)',           
          WebkitBackdropFilter: 'blur(12px)',     
          border: '1px solid rgba(255, 255, 255, 0.15)', 
          borderRadius: '30px',                   
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            color: 'var(--cyan)',
            margin: '0 0 0.75rem 0',
            fontWeight: 400,
            fontFamily: '"League Spartan", sans-serif',
          }}
        >
          HELLO, I'M
        </p>

        <div
          ref={containerRef}
          className={glitch ? 'glitch-once' : ''}
          style={{ position: 'relative', margin: '0 0 1rem 0' }}
        >
          <VariableProximity
            label="Muhammad Saad"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 900, 'opsz' 40"
            containerRef={containerRef}
            radius={120}
            falloff="gaussian"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              fontFamily: '"League Spartan", sans-serif',
              background: 'linear-gradient(to right, #00e5ff, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.05,
              fontWeight: 400,
            }}
          />
        </div>

        <p
          style={{
            fontFamily: '"League Spartan", sans-serif',
            fontSize: '1.35rem',
            fontWeight: 600,
            color: 'var(--text)',
            margin: '0 0 0.5rem 0',
            minHeight: '1.6em',
          }}
        >
          {typed}
          {showCursor && <span className="cursor-blink">|</span>}
        </p>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', margin: '0 0 0.25rem 0' }}>
          Bridging the gap between intelligent systems and immersive design.
        </p>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '42ch', margin: '0 0 2rem 0' }}>
          Specializing in AI-driven creativity, high-impact motion graphics, and visual storytelling.
        </p>

        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link
            to="/work"
            style={{
              padding: '0.85rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'var(--cyan)',
              fontWeight: 600,
              textDecoration: 'none',
              backdropFilter: 'blur(5px)'
            }}
          >
            View My Work
          </Link>

          <button
            onClick={() => scrollTo('contact')}
            style={{
              padding: '0.85rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'var(--purple)',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(5px)'
            }}
          >
            Get In Touch
          </button>

          <a
            href="/M.Saad_RESUME.pdf"
            download
            style={{
              background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
              color: '#fff',
              padding: '0.85rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 0 25px rgba(0,229,255,0.3)'
            }}
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}
