
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingLines from './components/FloatingLines'
import ClickSpark from './components/ui/ClickSpark' // Added this import

export default function App() {
  return (
    <ClickSpark sparkColor='#00e5ff'> 
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.35,
      }}>
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
        <Navbar />
        <main>
          <Hero />
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Work />
          <div className="section-divider" />
          <Skills />
          <div className="section-divider" />
          <Contact />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  )
}
