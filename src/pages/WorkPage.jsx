import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CircularGallery from '../components/CircularGallery'
import Ascension from '../assets/Ascension.png'
import LostEmbrace from '../assets/Lost Embrace.png'
import Perspective from '../assets/Perspective.png'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { id: 'ascension', text: 'Ascension', image: Ascension },
  { id: 'lost-embrace', text: 'Lost Embrace', image: LostEmbrace },
  { id: 'perspective', text: 'Perspective', image: Perspective },
  { id: 'divo', text: 'DIVO', image: '/DIVO.png' },
  { id: 'mahoraga', text: 'MAHORAGA', image: '/MAHORAGA.png' },
  { id: 'porsche', text: 'PORSCHE', image: '/PORSCHE.png' },
  { id: 'ryomen-sukuna', text: 'Ryomen_Sukuna', image: '/Ryomen_Sukuna.png' },
  { id: 'supra', text: 'SUPRA', image: '/SUPRA.png' },
  { id: 'toji', text: 'TOJI', image: '/TOJI.png' }
]

export default function WorkPage() {
  const [activeProject, setActiveProject] = useState(null)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveProject(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useLayoutEffect(() => {
    if (!sectionRef.current || !headingRef.current) return undefined
    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top+=20',
          end: 'top+=120 top',
          scrub: true
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="work-page work-circular" ref={sectionRef}>
      <div className="work-page-head">
        <p className="section-kicker">Work Gallery</p>
        <h2 ref={headingRef}>My Projects</h2>
      </div>
      <div className="work-circular-stage">
        <CircularGallery
          items={PROJECTS}
          /* Slightly shallower bend for clearer separation on mobile */
          bend={2.5} 
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.06}
          mass={0.6} 
          onItemOpen={(item) => {
            if (item?.id) {
              setActiveProject(item)
              return
            }
            if (item?.image) window.open(item.image, '_blank', 'noopener,noreferrer')
          }}
        />
      </div>
      {activeProject && (
        <div
          className="work-lightbox"
          style={{ opacity: 1, pointerEvents: 'auto' }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null)
          }}
        >
          <button type="button" className="lightbox-close" onClick={() => setActiveProject(null)} aria-label="Close fullscreen project view">
            X
          </button>
          <div className="work-lightbox-content">
            <img src={activeProject.image} alt={activeProject.text} />
            <p>{activeProject.text}</p>
          </div>
        </div>
      )}
    </section>
  )
}
