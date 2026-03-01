import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PillNav from './components/ui/PillNav';
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ClickSpark from './components/ui/ClickSpark'
import ColorBends from './components/ui/ColorBends';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);
  return null;
}

function Navigation() {
  const location = useLocation();
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Skills', href: '/#skills' }, 
    { label: 'Contact', href: '/#contact' }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'fixed', top: '1.5rem', zIndex: 1000 }}>
     <PillNav 
  logo="/MS.png" 
  logoAlt="MS Logo"
  items={navItems}
  activeHref={location.pathname}
  // Change baseColor to match the CSS RGBA for consistency
  baseColor="rgba(6, 0, 16, 0.4)" 
  pillColor="transparent" // Let the CSS handle the pill background
  pillTextColor="#00e5ff"  // Your Cyan color for the text
  hoveredPillTextColor="#000"
/>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ClickSpark sparkColor='#00e5ff'> 
        
        {/* NEW ANIMATED BACKGROUND LAYER */}
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: -1, 
          background: '#050505' 
        }}>
          <ColorBends 
            colors={["#00e5ff", "#8a5cff", "#000000"]} // Cyan to Purple to Black
            speed={0.15} 
            scale={1.0} 
            rotation={0}
            warpStrength={1.0}
            noise={0.05}
            transparent={true}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <div className="section-divider" />
                  <About />
                  <div className="section-divider" />
                  <Skills />
                  <div className="section-divider" />
                  <Contact />
                </>
              } />
              <Route path="/work" element={
                <div style={{ paddingTop: '120px' }}>
                  <Work />
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </ClickSpark>
    </Router>
  );
}
