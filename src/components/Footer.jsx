import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import SpotlightCard from './ui/SpotlightCard';

export default function Footer() {
  const iconLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    color: 'var(--cyan)',
    fontSize: '1.4rem',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    position: 'relative',
    zIndex: 2,
    background: 'transparent'
  };

  return (
    <footer
      className="site-footer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        padding: '5rem 2rem 3rem',
        borderTop: '1px solid rgba(0,229,255,0.15)',
        background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.03))',
        color: 'var(--text-muted)',
      }}
    >
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        
        {/* GitHub Spotlight Icon */}
        <SpotlightCard 
          spotlightColor="rgba(0, 229, 255, 0.4)" 
          className="footer-icon-wrapper"
        >
          <a 
            href="https://github.com/Saaddotcom" 
            target="_blank" 
            rel="noopener noreferrer"
            style={iconLinkStyle}
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </SpotlightCard>

        {/* LinkedIn Spotlight Icon */}
        <SpotlightCard 
          spotlightColor="rgba(168, 85, 247, 0.4)" 
          className="footer-icon-wrapper"
        >
          <a 
            href="https://www.linkedin.com/in/muhammad-saad-60b700301/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={iconLinkStyle}
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </SpotlightCard>
      </div>

      <div style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.8 }}>
        <p style={{ margin: 0, color: 'var(--text)', fontWeight: 500, letterSpacing: '0.05em' }}>
          MUHAMMAD SAAD
        </p>
        <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)' }}>
          © 2026 · Karachi, Pakistan
        </p>
      </div>
    </footer>
  );
}
