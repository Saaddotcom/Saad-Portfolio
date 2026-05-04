import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { CustomEase } from 'gsap/CustomEase'
import GooeyNav from './GooeyNav'

gsap.registerPlugin(ScrollToPlugin, CustomEase)
CustomEase.create('main', '0.16, 1, 0.3, 1')

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToHash = (hash) => {
    const target = document.querySelector(hash)
    if (!target) {
      gsap.to(window, { duration: 0.7, ease: 'main', scrollTo: { y: 0 } })
      return
    }
    gsap.to(window, {
      duration: 1,
      ease: 'main',
      scrollTo: { y: target, offsetY: 90 }
    })
  }

  const handleAnchor = (hash) => {
    if (location.pathname !== '/') {
      navigate('/')
      requestAnimationFrame(() => {
        setTimeout(() => scrollToHash(hash), 90)
      })
      return
    }
    scrollToHash(hash)
  }

  const navItems = useMemo(() => ([
    { label: 'Home', href: '#hero', action: () => handleAnchor('#hero') },
    { label: 'Work', href: '/work', action: () => navigate('/work') },
    { label: 'Skills', href: '#skills', action: () => handleAnchor('#skills') },
    { label: 'Contact', href: '#contact', action: () => handleAnchor('#contact') }
  ]), [location.pathname])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="site-nav">
        <Link to="/" className="nav-logo magnetic-target">MS</Link>
        <GooeyNav
          items={navItems}
          particleCount={15}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          initialActiveIndex={location.pathname === '/work' ? 1 : 0}
          onItemSelect={(item) => item.action()}
        />
      </nav>
    </header>
  )
}
