import { useEffect } from 'react'; // Combined here
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PillNav from './components/ui/PillNav';
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingLines from './components/FloatingLines'
import ClickSpark from './components/ui/ClickSpark'

// 1. Moving the Scroll Logic into a helper component
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
        // Update this line to use your new logo file
        logo="/MS.png" 
        logoAlt="MS Logo"
        items={navItems}
        activeHref={location.pathname}
        baseColor="#060010" 
 	 pillColor="var(--cyan)"
 	 pillTextColor="#060010"
 	 hoveredPillTextColor="#000"
      />
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <ScrollToTop /> {/* This handles the cross-page jumping */}
      <ClickSpark sparkColor='#00e5ff'> 
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.35 }}>
          <FloatingLines
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={9}
            lineDistance={5}
            bendRadius={5}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
            linesGradient={['#00e5ff', '#a855f7', '#00e5ff']}
            mixBlendMode="screen"
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
