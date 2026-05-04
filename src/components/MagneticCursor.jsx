import { useEffect } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)
CustomEase.create('premiumEase', '0.16,1,0.3,1')

export default function MagneticCursor() {
  useEffect(() => {
    const dot = document.createElement('div')
    const ring = document.createElement('div')
    dot.className = 'cursor-dot'
    ring.className = 'cursor-ring'
    ring.setAttribute('data-label', '')
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    const moveCursor = (event) => {
      gsap.to(dot, { x: event.clientX, y: event.clientY, duration: 0.12, ease: 'premiumEase' })
      gsap.to(ring, { x: event.clientX, y: event.clientY, duration: 0.28, ease: 'premiumEase' })
    }

    let activeTarget = null
    const selector = 'a, button, .magnetic-target'

    const handleOver = (event) => {
      const target = event.target.closest(selector)
      if (!target) return
      activeTarget = target
      ring.classList.add('hovering')
      if (target.classList.contains('view-target') && !document.body.classList.contains('lightbox-open')) {
        ring.classList.add('viewing')
        ring.setAttribute('data-label', 'VIEW')
      }
    }

    const handleOut = (event) => {
      const target = event.target.closest(selector)
      if (!target) return
      ring.classList.remove('hovering')
      ring.classList.remove('viewing')
      ring.setAttribute('data-label', '')
      gsap.to(target, { x: 0, y: 0, duration: 0.42, ease: 'premiumEase' })
      if (activeTarget === target) activeTarget = null
    }

    const handleMagneticMove = (event) => {
      if (!activeTarget) return
      const rect = activeTarget.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      gsap.to(activeTarget, { x: x * 0.2, y: y * 0.2, duration: 0.42, ease: 'premiumEase' })
    }

    window.addEventListener('pointermove', moveCursor)
    document.addEventListener('pointerover', handleOver)
    document.addEventListener('pointerout', handleOut)
    document.addEventListener('pointermove', handleMagneticMove)
    return () => {
      window.removeEventListener('pointermove', moveCursor)
      document.removeEventListener('pointerover', handleOver)
      document.removeEventListener('pointerout', handleOut)
      document.removeEventListener('pointermove', handleMagneticMove)
      dot.remove()
      ring.remove()
    }
  }, [])

  return null
}
