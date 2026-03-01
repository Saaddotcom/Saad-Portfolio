import { useInView } from '../hooks/useInView'
import GradualBlur from './ui/GradualBlur'
import ScrollFloat from './ui/ScrollFloat'
import ProfileCard from './ui/ProfileCard' 
import './ui/ProfileCard.css'

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

      <div className="about-inner" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Side: The Interactive Card (Hire Me Removed) */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <ProfileCard 
            name="Muhammad Saad"
            title="AI Student & Visual Designer"
            handle="saaddotcom"
            status="Online"
            avatarUrl="/linkedin_pic.jpeg"
            contactText="" // Removed button text
            showUserInfo={true}
            enableTilt={true}
            behindGlowEnabled={true}
            behindGlowColor="rgba(0, 229, 255, 0.4)" 
          />
        </div>

        {/* Right Side: Your Story in Glass */}
        <div 
          style={{ 
            padding: '2.5rem',
            background: 'rgba(255, 255, 255, 0.1)', // Exact background
            backdropFilter: 'blur(10px)',           // Exact blur
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)', // Border for glass edge
            borderRadius: '30px',                   // Matches reference
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <p style={{ color: 'var(--text)', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.5rem 0', maxWidth: '55ch', fontFamily: '"League Spartan", sans-serif' }}>
            I am Saad, a first-year <strong style={{ color: 'var(--cyan)' }}>BS Artificial Intelligence</strong> student at the <strong style={{ color: 'var(--purple)' }}>University of Karachi (UBIT)</strong> with a specialized focus on AI-powered workflows.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', margin: '0 0 2rem 0', maxWidth: '55ch', fontFamily: '"League Spartan", sans-serif' }}>
            I bridge the gap between technical understanding and visual storytelling—combining design sensibility with smart automation to help brands communicate complex ideas.
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
                  backdropFilter: 'blur(4px)', // Glassy chips
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

      <GradualBlur position="bottom" height="5rem" strength={2} divCount={5} curve="bezier" opacity={0.8} />

      <style>{`
        @media (max-width: 900px) {
          .about .about-inner { grid-template-columns: 1fr !important; }
          .about-inner { gap: 3rem !important; }
          .about .chip { justify-content: center; }
        }
      `}</style>
    </section>
  )
}
