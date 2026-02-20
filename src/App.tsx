import { useState, useEffect } from 'react'
import './index.css'
import Navbar from './components/layout/Navbar'
import Hero from './components/home/Hero'
import FeaturePanels from './components/home/FeaturePanels'
import TrendingGrid from './components/home/TrendingGrid'

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen bg-[var(--g2-bg)] transition-colors duration-200">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar dark={dark} onToggle={() => setDark((d) => !d)} />
      <main id="main-content">
        <Hero />
        <FeaturePanels />
        <TrendingGrid />
      </main>
    </div>
  )
}
