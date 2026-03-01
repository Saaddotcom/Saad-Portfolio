import { useInView } from '../hooks/useInView'
import ScrollFloat from './ui/ScrollFloat'

const SKILLS = [
  'Artificial Intelligence', 
  'Machine Learning', 
  'AI-Powered Workflows', 
  'Graphic Design', 
  'Smart Automation', 
  'Creative Content Production', 
  'Social Media Content Creation', 
  'Project Management', 
  'Canva', 
  'CapCut', 
  'Alight Motion'
];

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" className="section skills" ref={ref} style={{ maxWidth: '72rem', margin: '0 auto', padding: '5rem 3rem' }}>
      <p className="section-label" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--cyan)', margin: '0 0 0.5rem 0', fontWeight: 600 }}>TOOLS & EXPERTISE</p>
      
      <div className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, margin: '0 0 3rem 0', color: 'var(--text)' }}>
        <ScrollFloat>Tools & Expertise</ScrollFloat>
      </div>

      <ul style={{ 
        listStyle: 'none', 
        margin: 0, 
        padding: 0, 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
        gap: '1rem' 
      }}>
        {SKILLS.map((name, i) => (
          <li
            key={name}
            className={`fade-in-up ${inView ? 'visible' : ''}`}
            style={{
              transitionDelay: `${i * 100}ms`,
              // GLASS EFFECT
              background: 'rgba(255, 255, 255, 0.1)', 
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              
              // Edge styling
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderBottom: '2px solid var(--cyan)', 
              borderRadius: 12,
              
              padding: '1.25rem 1rem',
              color: 'var(--text)',
              fontSize: '0.9rem',
              fontWeight: 500,
              textAlign: 'center',
              fontFamily: '"League Spartan", sans-serif',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,229,255,0.2)';
              e.currentTarget.style.transform = 'translateY(-5px)'; 
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  )
}
