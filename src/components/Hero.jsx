import { useState, useEffect, useRef } from 'react'
import VariableProximity from './ui/VariableProximity'
import ClickSpark from './ui/ClickSpark'

const SUBTITLE = 'AI Student & Creative Designer'
const TYPE_MS = 50
const GLITCH_REMOVE_MS = 800

export default function Hero() {
  const [glitch, setGlitch] = useState(true)
  const [typed, setTyped] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const gridRef = useRef(null)
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

  useEffect(() => {
    const onScroll = () => {
      if (gridRef.current) gridRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <ClickSpark sparkColor="#00e5ff" sparkSize={8} sparkRadius={20} sparkCount={8} duration={500}>
      <section
        id="hero"
        className="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '6rem 3rem 5rem',
          maxWidth: '72rem',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        {/* Grid background */}
        <div
          ref={gridRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />
        {/* Orb-like blurs */}
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(0,229,255,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: 280,
            height: 280,
            background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <p
            className="hero-label"
           style={{
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  letterSpacing: '0.4em',
  color: 'var(--cyan)',
  margin: '0 0 0.75rem 0',
  fontWeight: 400, // Light weight
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
  className="variable-proximity-demo"
  fromFontVariationSettings="'wght' 400, 'opsz' 9"
  toFontVariationSettings="'wght' 900, 'opsz' 40"
  containerRef={containerRef}
  radius={120}
  falloff="gaussian"
  style={{
    fontSize: 'clamp(3.5rem, 10vw, 7rem)',
    fontFamily: '"League Spartan", sans-serif', // Added font here
    background: 'linear-gradient(to right, #00e5ff, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.05,
    fontWeight: 400, // Base weight is now light
  }}
/>
          </div>

          <p
            className="hero-subtitle"
            style={{
              fontFamily: '"League Spartan", sans-serif',
              fontSize: '1.35rem',
              fontWeight: 600,
              color: 'var(--text)',
              margin: '0 0 0.5rem 0',
              minHeight: '1.6em',
            }}
          >
            <span id="typewriter">{typed}</span>
            {showCursor && (
              <span className="cursor-blink" style={{ marginLeft: 2 }}>
                |
              </span>
            )}
          </p>
          <p
            className="hero-tagline"
            style={{ fontSize: '1.15rem', color: 'var(--text-muted)', margin: '0 0 0.25rem 0' }}
          >
            I craft visuals that speak before words do.
          </p>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              maxWidth: '42ch',
              margin: '0 0 2rem 0',
            }}
          >
            Graphic Designer & Video Editor specializing in high-impact visual content, motion graphics, and
            creative storytelling.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => scrollTo('work')}
              className="btn btn-cyan"
              style={{
                background: 'transparent',
                color: 'var(--cyan)',
                border: '2px solid var(--cyan)',
                padding: '0.75rem 1.5rem',
                borderRadius: 8,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              View My Work
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="btn btn-purple"
              style={{
                background: 'transparent',
                color: 'var(--purple)',
                border: '2px solid var(--purple)',
                padding: '0.75rem 1.5rem',
                borderRadius: 8,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              Get In Touch
            </button>
            <a
              href="/M.Saad_RESUME.pdf"
              download
              className="btn btn-gradient"
              style={{
                background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: 8,
                fontWeight: 600,
                boxShadow: '0 0 25px rgba(0,229,255,0.3), 0 0 50px rgba(168,85,247,0.2)',
                textDecoration: 'none',
              }}
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </ClickSpark>
  )
}
