import { useInView } from '../hooks/useInView'
import GradualBlur from './ui/GradualBlur'
import ScrollFloat from './ui/ScrollFloat'

const CHIPS = ['Canva', 'Adobe After Effects', 'CapCut', 'Graphic Design', 'Video Editing', 'Project Management', 'Time Management']

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className={`section about fade-in-up ${inView ? 'visible' : ''}`} ref={ref} style={{ maxWidth: '72rem', margin: '0 auto', padding: '5rem 3rem', position: 'relative', overflow: 'hidden' }}>
      <p className="section-label" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--cyan)', margin: '0 0 0.5rem 0', fontWeight: 600 }}>ABOUT ME</p>
      <div className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, margin: '0 0 3rem 0', color: 'var(--text)' }}>
        <ScrollFloat>About</ScrollFloat>
      </div>
      <div className="about-inner" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '5rem', alignItems: 'start' }}>
        <div style={{ position: 'relative' }}>
          <img
            src="/linkedin_pic.jpeg"
            alt="Muhammad Saad"
            width={220}
            height={220}
            style={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--cyan)',
              boxShadow: '0 0 25px rgba(0,229,255,0.3)',
              transition: 'box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.15)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(0,229,255,0.3)' }}
          />
        </div>
        <div>
          <p style={{ color: 'var(--text-muted)', margin: '0 0 1.5rem 0', maxWidth: '55ch' }}>
            I'm Saad, a first-year BS Artificial Intelligence student at the University of Karachi (UBIT) and a graphic designer with hands-on experience building visual content for university events and media teams. I've worked with FAST-NUCES and collaborated with media teams to build cohesive brand identities. I blend creative instinct with technical knowledge to produce work that's both visually sharp and intelligently crafted.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {CHIPS.map((label) => (
              <span
                key={label}
                className="chip"
                style={{
                  fontSize: '0.9rem',
                  padding: '0.4rem 1rem',
                  border: '1px solid var(--cyan)',
                  borderRadius: 999,
                  color: 'var(--cyan)',
                  background: 'transparent',
                  transition: 'box-shadow 0.25s ease, background 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.15)'; e.currentTarget.style.background = 'rgba(0,229,255,0.05)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'transparent' }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <GradualBlur position="bottom" height="5rem" strength={2} divCount={5} curve="bezier" opacity={0.8} />
      <style>{`
        @media (max-width: 768px) {
          .about .about-inner { grid-template-columns: 1fr !important; text-align: center; }
          .about img { margin: 0 auto; }
          .about .chip { justify-content: center; }
        }
      `}</style>
    </section>
  )
}
