import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import TiltedCard from './ui/TiltedCard'
import ScrollFloat from './ui/ScrollFloat'

const PROJECTS = [
  { src: '/Ryomen_Sukuna.png', title: 'Sukuna — Digital Poster', category: 'Graphic Design' },
  { src: '/PORSCHE.png', title: 'Porsche 718 GT4 RS — Automotive Design', category: 'Graphic Design' },
  { src: '/MAHORAGA.png', title: 'Mahoraga ADAPT — Fantasy Poster', category: 'Graphic Design' },
  // Add these new ones:
  { src: '/DIVO.png', title: 'Bugatti Divo — Concept Art', category: 'Graphic Design' },
  { src: '/TOJI.png', title: 'Toji Fushiguro — Zenin Shadow', category: 'Graphic Design' },
  { src: '/SUPRA.png', title: 'Toyota Supra — JDM Night', category: 'Graphic Design' },
]

export default function Work() {
  const [lightbox, setLightbox] = useState(null)
const [ref0, inView0] = useInView({ threshold: 0.1, triggerOnce: true });
const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: true });
const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });
const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: true }); // New
const [ref4, inView4] = useInView({ threshold: 0.1, triggerOnce: true }); // New
const [ref5, inView5] = useInView({ threshold: 0.1, triggerOnce: true }); // New

const refs = [ref0, ref1, ref2, ref3, ref4, ref5];
const inViews = [inView0, inView1, inView2, inView3, inView4, inView5];
  return (
    <>
      <section id="work" className="section work" style={{ maxWidth: '72rem', margin: '0 auto', padding: '5rem 3rem' }}>
        <p className="section-label" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--cyan)', margin: '0 0 0.5rem 0', fontWeight: 600 }}>SELECTED WORK · GRAPHIC DESIGN</p>
        <div className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, margin: '0 0 3rem 0', color: 'var(--text)' }}>
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>My Projects</ScrollFloat>
        </div>
        <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem', opacity: 0.8, maxWidth: '600px' }}>
  I will keep uploading my projects here as I keep designing more!
</div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
          {PROJECTS.map((proj, i) => (
  <li
    key={proj.src}
    ref={refs[i]}
    className={`fade-in-up ${inViews[i] ? 'visible' : ''}`}
    style={{ transitionDelay: `${i * 100}ms` }}
  >
    <div
      onClick={() => setLightbox(proj)}
      style={{
        position: 'relative',
        background: 'transparent', // Change from #111 to transparent
        aspectRatio: '3/4',
        cursor: 'pointer',
      }}
    >
      <TiltedCard
        imageSrc={proj.src}
        altText={proj.title}
        captionText={proj.title}
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={false}        // Set to false to remove the white text box
        displayOverlayContent={false}
        // Note: The onClick is now handled by the parent div
      />
    </div>
  </li>
))}
        </ul>
      </section>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Project image"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            animation: 'pageFadeIn 0.3s ease-out',
          }}
          onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: -40, right: 0, width: 40, height: 40, fontSize: '2rem', lineHeight: 1, color: 'var(--cyan)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, zIndex: 2 }}
            >
              ×
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.title}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                border: '2px solid var(--cyan)',
                boxShadow: '0 0 20px var(--cyan), 0 0 60px rgba(0,229,255,0.4), 0 0 100px rgba(168,85,247,0.2)',
                borderRadius: 8,
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <p style={{ margin: '1rem 0 0 0', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: '#fff', textAlign: 'center' }}>{lightbox.title}</p>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { #work ul { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { #work ul { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
