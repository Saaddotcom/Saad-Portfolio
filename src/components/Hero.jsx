import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import VariableProximity from './ui/VariableProximity'
import ProfileCard from './ui/ProfileCard'

const SUBTITLE = 'AI Student & Creative Designer'
const TYPE_MS = 45

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const nameContainerRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i += 1
      if (i <= SUBTITLE.length) {
        setTyped(SUBTITLE.slice(0, i))
      } else {
        setShowCursor(false)
        clearInterval(interval)
      }
    }, TYPE_MS)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const section = document.querySelector('#hero')
    if (!section || !cardRef.current || !subtitleRef.current) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight))
      const cardScale = 1 + progress * 0.2
      cardRef.current.style.transform = `scale(${cardScale})`
      subtitleRef.current.style.transform = `translateY(${progress * 26}px) scale(${1 - progress * 0.08})`
      subtitleRef.current.style.opacity = `${1 - progress * 0.35}`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleHireNow = (event) => {
    event.preventDefault()
    const target = document.querySelector('#contact')
    if (!target) return
    gsap.to(window, {
      duration: 1,
      ease: 'main',
      scrollTo: { y: target, offsetY: 90 }
    })
  }

  return (
    <section id="hero" className="hero-panel standalone-hero">
      <div className="hero-foreground">
        <p className="hero-kicker">Digital storyteller</p>
        <div ref={nameContainerRef} className="hero-name-wrap">
          <VariableProximity
            label="Muhammad Saad"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 900, 'opsz' 40"
            containerRef={nameContainerRef}
            radius={140}
            falloff="gaussian"
            className="hero-name-display"
            style={{
              fontSize: 'clamp(2.9rem, 11vw, 8.2rem)',
              fontFamily: '"Cormorant Garamond", serif',
              color: '#ffffff',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              textShadow:
                '0 0 28px rgba(0, 0, 0, 0.9), 0 2px 12px rgba(0, 0, 0, 0.75), 0 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          />
        </div>
        <p ref={subtitleRef} className="hero-subtitle">
          {typed}
          {showCursor && <span className="cursor-blink">|</span>}
        </p>
        <p className="hero-copy">
          I craft cinematic digital moments where AI engineering and bold visual design collide.
        </p>
        <div className="hero-actions">
          <Link className="hero-btn magnetic-target" to="/work">My Work</Link>
          <a className="hero-btn hero-btn-primary magnetic-target" href="#contact" onClick={handleHireNow}>Hire me now</a>
          <a className="hero-btn magnetic-target" href="/M.Saad_RESUME.pdf" download>Download Resume</a>
        </div>
      </div>
      <div ref={cardRef} className="hero-card-wrap">
        <ProfileCard
          avatarUrl="/linkedin_pic.jpeg"
          miniAvatarUrl="/linkedin_pic.jpeg"
          name="Muhammad Saad"
          title="AI Student & Creative Designer"
          handle="muhammadsaad"
          status="Open for collaborations"
          contactText="Let's build"
          enableMobileTilt
          onContactClick={() => {
            const contact = document.getElementById('contact')
            if (contact) contact.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      </div>
    </section>
  )
}
