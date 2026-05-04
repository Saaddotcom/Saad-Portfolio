import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { CustomEase } from 'gsap/CustomEase'
import './index.css'
import App from './App.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase)
CustomEase.create('main', '0.16, 1, 0.3, 1')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
