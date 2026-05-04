import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import './MagicBento.css'

const MOBILE_BREAKPOINT = 768

const CARDS = [
  { label: 'Skill', title: 'Artificial Intelligence', description: 'Core AI foundations and practical application.' },
  { label: 'Skill', title: 'Machine Learning', description: 'Model thinking, experimentation, and optimization.' },
  { label: 'Skill', title: 'AI-Powered Workflows', description: 'Automation-assisted production systems.' },
  { label: 'Skill', title: 'Graphic Design', description: 'Visual craft for branding and storytelling.' },
  { label: 'Skill', title: 'Smart Automation', description: 'Efficiency-first workflow integration.' },
  { label: 'Skill', title: 'Creative Content Production', description: 'High-quality concept-to-delivery execution.' },
  { label: 'Skill', title: 'Social Media Content Creation', description: 'Audience-aware content systems.' },
  { label: 'Skill', title: 'Project Management', description: 'Structured planning and delivery cadence.' },
  { label: 'Tool', title: 'Canva', description: 'Fast design workflows and template systems.' },
  { label: 'Tool', title: 'CapCut', description: 'Short-form video and editorial packaging.' },
  { label: 'Tool', title: 'Alight Motion', description: 'Motion graphics and animation composition.' }
]

export default function MagicBento({
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  glowColor = '132, 0, 255'
}) {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const disableHeavyAnimations = isMobile
  const canTilt = enableTilt && !disableHeavyAnimations
  const canMagnet = enableMagnetism && !disableHeavyAnimations
  const canStars = enableStars && !disableHeavyAnimations
  const canSpotlight = enableSpotlight && !disableHeavyAnimations

  const cardRefs = useMemo(() => [], [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const cards = cardRefs.filter(Boolean)
    if (!cards.length) return undefined

    const cleanupFns = []

    if (canSpotlight) {
      const spotlight = document.createElement('div')
      spotlight.className = 'magic-bento-spotlight'
      spotlight.style.setProperty('--glow-color', glowColor)
      section.appendChild(spotlight)

      const onMove = (event) => {
        const rect = section.getBoundingClientRect()
        const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom
        if (!inside) {
          gsap.to(spotlight, { opacity: 0, duration: 0.25, ease: 'power2.out' })
          return
        }
        gsap.to(spotlight, { x: event.clientX - rect.left, y: event.clientY - rect.top, opacity: 0.7, duration: 0.15, ease: 'power2.out' })
      }

      document.addEventListener('pointermove', onMove)
      cleanupFns.push(() => {
        document.removeEventListener('pointermove', onMove)
        spotlight.remove()
      })
    }

    cards.forEach((card) => {
      const onMove = (event) => {
        const rect = card.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`)
        card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`)

        const cx = rect.width / 2
        const cy = rect.height / 2
        if (canTilt) {
          gsap.to(card, {
            rotateX: ((y - cy) / cy) * -8,
            rotateY: ((x - cx) / cx) * 8,
            duration: 0.18,
            ease: 'power2.out',
            transformPerspective: 900
          })
        }
        if (canMagnet) {
          gsap.to(card, {
            x: (x - cx) * 0.04,
            y: (y - cy) * 0.04,
            duration: 0.24,
            ease: 'power2.out'
          })
        }
      }

      const onLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.25, ease: 'power2.out' })
      }

      const onEnter = () => {
        if (!canStars) return
        for (let i = 0; i < 12; i += 1) {
          const p = document.createElement('span')
          p.className = 'magic-bento-star'
          p.style.setProperty('--glow-color', glowColor)
          p.style.left = `${Math.random() * 100}%`
          p.style.top = `${Math.random() * 100}%`
          card.appendChild(p)
          gsap.fromTo(
            p,
            { scale: 0, opacity: 0, x: 0, y: 0 },
            {
              scale: 1,
              opacity: 0.8,
              x: (Math.random() - 0.5) * 90,
              y: (Math.random() - 0.5) * 90,
              duration: 0.7 + Math.random() * 0.7,
              ease: 'power2.out',
              onComplete: () => gsap.to(p, { opacity: 0, duration: 0.45, onComplete: () => p.remove() })
            }
          )
        }
      }

      const onClick = (event) => {
        if (!clickEffect) return
        const rect = card.getBoundingClientRect()
        const ripple = document.createElement('span')
        ripple.className = 'magic-bento-ripple'
        ripple.style.setProperty('--glow-color', glowColor)
        ripple.style.left = `${event.clientX - rect.left}px`
        ripple.style.top = `${event.clientY - rect.top}px`
        card.appendChild(ripple)
        gsap.fromTo(ripple, { scale: 0, opacity: 0.85 }, { scale: 2.8, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: () => ripple.remove() })
      }

      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)
      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('click', onClick)
      cleanupFns.push(() => {
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', onLeave)
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('click', onClick)
      })
    })

    return () => cleanupFns.forEach((fn) => fn())
  }, [cardRefs, canTilt, canMagnet, canStars, canSpotlight, clickEffect, glowColor])

  return (
    <section id="skills" className="magic-bento-section home-section" ref={sectionRef}>
      <div className="skills-intro">
        <p className="skills-kicker">Tools and expertise</p>
        <h2>My Skills</h2>
      </div>
      <div className="magic-bento-grid">
        {CARDS.map((card, index) => (
          <article
            key={card.title}
            ref={(el) => { cardRefs[index] = el }}
            className={`magic-bento-card ${enableBorderGlow ? 'magic-bento-border' : ''}`}
            style={{ '--glow-color': glowColor }}
          >
            <span className="magic-bento-label">{card.label}</span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
