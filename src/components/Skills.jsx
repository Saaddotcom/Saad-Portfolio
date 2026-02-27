import { useInView } from '../hooks/useInView'
import ScrollFloat from './ui/ScrollFloat'

const SKILLS = ['Canva', 'Kittl', 'CapCut', 'Alight Motion', 'Graphic Design', 'Video Editing', 'Project Management', 'Time Management', 'Creative Storytelling']

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
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', // Shrinks box width
  gap: '1rem' // Tighter spacing
}}>
  {SKILLS.map((name, i) => (
    <li
      key={name}
      className={`fade-in-up ${inView ? 'visible' : ''}`}
      style={{
        transitionDelay: `${i * 100}ms`,
        background: '#111',
        border: '1px solid #1a1a1a',
        borderBottom: '2px solid var(--cyan)',
        borderRadius: 8,
        padding: '1.25rem 1rem', // MUCH smaller padding
        color: 'var(--text)',
        fontSize: '0.9rem', // Smaller text for smaller boxes
        fontWeight: 500,
        textAlign: 'center', // Centers text in the smaller box
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={(e) => { 
        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.15)';
        e.currentTarget.style.transform = 'translateY(-5px)'; 
      }}
      onMouseLeave={(e) => { 
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
