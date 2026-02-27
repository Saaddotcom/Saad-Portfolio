import { useInView } from '../hooks/useInView'
import GradualBlur from './ui/GradualBlur'
import ScrollFloat from './ui/ScrollFloat'
import ProfileCard from './ui/ProfileCard' // 1. Import the card
import './ui/ProfileCard.css' // 2. Ensure CSS is imported

const CHIPS = [
  'Artificial Intelligence', 
  'AI-Powered Workflows', 
  'Graphic Design', 
  'Creative Content Production'
];

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className={`section about fade-in-up ${inView ? 'visible' : ''}`} ref={ref} style={{ maxWidth: '72rem', margin: '0 auto', padding: '5rem 3rem', position: 'relative', overflow: 'visible' }}> {/* Changed overflow to visible for the card glow */}
      
      <p className="section-label" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--cyan)', margin: '0 0 0.5rem 0', fontWeight: 600 }}>ABOUT ME</p>
      
      <div className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, margin: '0 0 3rem 0', color: 'var(--text)' }}>
        <ScrollFloat>About</ScrollFloat>
      </div>

      <div className="about-inner" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Side: The Interactive Card */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <ProfileCard 
            name="Muhammad Saad"
            title="AI Student & Visual Designer"
            handle="saaddotcom"
            status="Online"
            avatarUrl="/linkedin_pic.jpeg"
            contactText="Hire Me"
            showUserInfo={true}
            enableTilt={true}
            behindGlowEnabled={true}
            behindGlowColor="rgba(0, 229, 255, 0.4)" // Match your cyan theme
          />
        </div>

        {/* Right Side: Your Story */}
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.5rem 0', maxWidth: '55ch' }}>
            I am Saad, a first-year <strong>BS Artificial Intelligence</strong> student at the <strong>University of Karachi (UBIT)</strong> with a specialized focus on AI-powered workflows. I bridge the gap between technical understanding and visual storytelling—combining design sensibility with smart automation to help brands communicate complex ideas. 
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0', maxWidth: '55ch' }}>
            Whether it's building cohesive identities for FAST-NUCES or creating high-impact content, I produce work that is both visually sharp and intelligently crafted.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {CHIPS.map((label) => (
              <span
                key={label}
                className="chip"
                style={{
                  fontSize: '0.85rem',
                  padding: '0.5rem 1.25rem',
                  border: '1px solid rgba(0,229,255,0.3)',
                  borderRadius: 999,
                  color: 'var(--cyan)',
                  background: 'rgba(0,229,255,0.03)',
                  transition: 'all 0.25s ease',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <GradualBlur position="bottom" height="5rem" strength={2} divCount={5} curve="bezier" opacity={0.8} />

      <style>{`
        @media (max-width: 900px) {
          .about .about-inner { grid-template-columns: 1fr !important; text-align: center; }
          .about-inner { gap: 3rem !important; }
          .about .chip { justify-content: center; }
          .about-text-side { display: flex; flex-direction: column; align-items: center; }
        }
      `}</style>
    </section>
  )
}
