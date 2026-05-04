import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import Hero from './Hero'
import Gallery from './Gallery'
import Skills from './Skills'

gsap.registerPlugin(ScrollTrigger, CustomEase)
CustomEase.create('premiumEase', '0.16,1,0.3,1')

export default function ScrollyPortfolio() {
  const wrapperRef = useRef(null)
  const stickyRef = useRef(null)
  const heroCardRef = useRef(null)
  const heroSubtitleRef = useRef(null)
  const heroForegroundRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.story-panel')
      const galleryItems = gsap.utils.toArray('.gallery-item')
      const skillTags = gsap.utils.toArray('.skill-tag')

      gsap.set(panels, { opacity: 0, pointerEvents: 'none' })
      gsap.set(panels[0], { opacity: 1, pointerEvents: 'auto' })
      gsap.set(galleryItems, { opacity: 0, yPercent: 35, rotateX: -14, rotateZ: -7, scale: 0.88 })

      const timeline = gsap.timeline({
        defaults: { ease: 'premiumEase' },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=650%',
          pin: stickyRef.current,
          scrub: 1,
          anticipatePin: 1
        }
      })

      timeline
        .to(heroCardRef.current, { scale: 1.95, yPercent: -12, opacity: 0.24, duration: 1.2 }, 0)
        .to(heroSubtitleRef.current, { yPercent: 190, scale: 0.74, opacity: 0.2, duration: 1 }, 0.05)
        .to(heroForegroundRef.current, { yPercent: -12, opacity: 0.44, duration: 1 }, 0.1)
        .to(panels[0], { opacity: 0, pointerEvents: 'none', duration: 0.55 }, 1.05)
        .to(panels[1], { opacity: 1, pointerEvents: 'auto', duration: 0.55 }, 1.05)

      galleryItems.forEach((item, index) => {
        const textBack = item.querySelector('.gallery-project-text-back')
        const textFront = item.querySelector('.gallery-copy-wrap')
        const inPoint = 1.3 + index * 0.9

        timeline
          .to(item, { opacity: 1, yPercent: 0, rotateX: 0, rotateZ: 0, scale: 1.05, duration: 0.55 }, inPoint)
          .fromTo(textBack, { yPercent: 0, opacity: 0.3 }, { yPercent: -16, opacity: 0.08, duration: 0.55 }, inPoint)
          .fromTo(textFront, { yPercent: 28, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55 }, inPoint + 0.18)
          .to(item, { yPercent: -22, rotateZ: index % 2 === 0 ? 10 : -10, opacity: 0, scale: 0.92, duration: 0.7 }, inPoint + 0.62)
      })

      timeline
        .to(panels[1], { opacity: 0, pointerEvents: 'none', duration: 0.5 }, 4.3)
        .to(panels[2], { opacity: 1, pointerEvents: 'auto', duration: 0.5 }, 4.3)
        .fromTo(skillTags, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5 }, 4.5)
        .to(skillTags, { y: -25, stagger: 0.03, duration: 1.2 }, 5.1)
        .to(panels[2], { opacity: 0.15, duration: 1 }, 5.8)
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="scrolly-wrapper">
      <div ref={stickyRef} className="scrolly-sticky">
        <Hero
          cardRef={heroCardRef}
          subtitleRef={heroSubtitleRef}
          foregroundRef={heroForegroundRef}
        />
        <Gallery />
        <Skills />
        <section id="contact" className="scrolly-contact">
          <p>Ready to launch your next jaw-drop moment?</p>
          <a href="mailto:youremail@example.com" className="hero-btn hero-btn-primary magnetic-target">
            Hire Muhammad Saad
          </a>
        </section>
      </div>
    </div>
  )
}
