import { useInView } from '../hooks/useInView'
import ScrollFloat from './ui/ScrollFloat'

const CHIPS = [
  'Artificial Intelligence', 
  'AI-Powered Workflows', 
  'Graphic Design', 
  'Creative Content Production'
];

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section 
      id="about" 
      className={`section about fade-in-up ${inView ? 'visible' : ''}`} 
      ref={ref} 
      style={{ maxWidth: '72rem', margin: '0 auto', padding: '5rem 3rem', position: 'relative', overflow: 'visible' }}
    >
      
      <p className="section-label" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--cyan)', margin: '0 0 0.5rem 0', fontWeight: 600 }}>ABOUT ME</p>
      
      <div className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, margin: '0 0 3rem 0', color: 'var(--text)' }}>
        <ScrollFloat>About</ScrollFloat>
      </div>

      <div className="about-inner">
        <div className={`about-glass fade-in-up ${inView ? 'visible' : ''}`}>
          <p className="about-text about-text-main">
            I am Saad, a first-year BS Artificial Intelligence student at the <strong>University of Karachi (UBIT)</strong> with a specialized focus on <strong>AI-powered workflows</strong>.
          </p>
          <p className="about-text">
            I bridge the gap between technical understanding and visual storytelling - combining design sensibility with smart automation to help brands communicate complex ideas.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {CHIPS.map((label) => (
              <span
                key={label}
                className="chip"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.5rem 1.25rem',
                  border: '1px solid rgba(0,229,255,0.3)',
                  borderRadius: 999,
                  color: 'var(--cyan)',
                  background: 'rgba(0,229,255,0.08)',
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.25s ease',
                  fontFamily: '"League Spartan", sans-serif'
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
