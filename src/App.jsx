import { useMemo, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MagneticCursor from './components/MagneticCursor'
import Navbar from './components/Navbar'
import PixelSnow from './components/PixelSnow'
import Home from './pages/Home'
import WorkPage from './pages/WorkPage'
import Footer from './components/Footer'
import ExperienceDisclaimer from './components/ExperienceDisclaimer'

// Import your static mobile background
import MobileBg from './assets/abstract-geometric-background-shapes-texture.jpg'

/**
 * App Component
 * 
 * Performance optimizations:
 * 1. Disables PixelSnow and MagneticCursor on touch devices[cite: 4].
 * 2. Uses static image fallback for mobile backgrounds.
 * 3. Orchestrates ExperienceDisclaimer to hide UI during intro.
 */
export default function App() {
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(true)

  // Detect touch devices for performance scaling[cite: 4]
  const isTouchDevice = useMemo(
    () => typeof window !== 'undefined' && 'ontouchstart' in window,
    []
  )

  // Handle the global timer for the intro sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisclaimerVisible(false)
    }, 3500) // 3.5s allows for the 3s progress bar + 0.5s buffer
    
    return () => clearTimeout(timer)
  }, [])

  // Background styling logic
  const backgroundStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    backgroundColor: '#08070b',
    backgroundImage: isTouchDevice ? `url(${MobileBg})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    opacity: isTouchDevice ? 0.35 : 1 
  }

  return (
    <Router>
      {/* Disclaimer handles its own fade-out based on the isVisible prop */}
      <ExperienceDisclaimer isVisible={isDisclaimerVisible} />

      <div className="immersive-bg" aria-hidden />
      
      <div className="pixel-snow-layer" aria-hidden style={backgroundStyle}>
        {!isTouchDevice && (
          <PixelSnow
            color="#ffffff"
            brightness={0.9}
            opacity={0.8}
            density={0.12}
            variant="round"
            pixelResolution={120}
          />
        )}
      </div>

      {/* Hide interactive UI elements until disclaimer is gone */}
      {!isDisclaimerVisible && (
        <>
          <Navbar />
          {!isTouchDevice && <MagneticCursor />}
        </>
      )}
      
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  )
}
