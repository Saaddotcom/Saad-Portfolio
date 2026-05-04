import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import Ascension from '../assets/Ascension.png'
import LostEmbrace from '../assets/Lost Embrace.png'
import Perspective from '../assets/Perspective.png'

gsap.registerPlugin(ScrollTrigger, CustomEase)
CustomEase.create('main', '0.16, 1, 0.3, 1')

const PROJECTS = [
  { title: 'Ascension', image: Ascension, description: 'A surreal vertical journey with cinematic light and atmospheric depth.' },
  { title: 'Lost Embrace', image: LostEmbrace, description: 'A melancholic composition blending softness and tension in one frame.' },
  { title: 'Perspective', image: Perspective, description: 'A bold study of direction, scale, and emotional focus through layout.' }
]

export default function FeaturedWorkTop3() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.featured-card')
      gsap.set(cards, { opacity: 0, yPercent: 50, rotateZ: -8, scale: 0.87 })

      const tl = gsap.timeline({
        defaults: { ease: 'main' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=210%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1
        }
      })

      cards.forEach((card, index) => {
        const base = index * 1.1
        tl.to(card, { opacity: 1, yPercent: 0, rotateZ: 0, scale: 1, duration: 0.55 }, base)
          .to(card, { opacity: 0, yPercent: -15, rotateZ: index % 2 ? -10 : 10, scale: 0.93, duration: 0.6 }, base + 0.58)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="featured" ref={sectionRef} className="featured-section">
      <div className="featured-header">
        <p className="section-kicker">Featured Work</p>
        <h2>Top 3 immersive concepts</h2>
      </div>
      <div className="featured-stage">
        {PROJECTS.map((project) => (
          <article key={project.title} className="featured-card magnetic-target">
            <div className="featured-image-wrap">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="featured-card-copy">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
