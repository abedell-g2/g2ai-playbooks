import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/layout/Navbar'
import Hero from './components/home/Hero'
import AllPlaybooks from './components/home/TrendingGrid'
import PlaybookBuilder from './pages/PlaybookBuilder'
import PlaybookStart from './pages/PlaybookStart'
import PlaybookView from './pages/PlaybookView'

function useTheme() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return { dark, toggle: () => setDark((d) => !d) }
}

function Homepage({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <div className="min-h-screen bg-[var(--g2-bg)] transition-colors duration-200">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar dark={dark} onToggle={onToggle} />
      <main id="main-content">
        <Hero dark={dark} />
        <AllPlaybooks dark={dark} />
      </main>
    </div>
  )
}

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <BrowserRouter basename="/g2ai-playbooks">
      <Routes>
        <Route path="/" element={<Homepage dark={dark} onToggle={toggle} />} />
        <Route path="/playbook/start" element={<PlaybookStart dark={dark} />} />
        <Route path="/playbook/new" element={<PlaybookBuilder dark={dark} onToggle={toggle} />} />
        <Route path="/playbook/view/:id" element={<PlaybookView dark={dark} onToggle={toggle} />} />
      </Routes>
    </BrowserRouter>
  )
}
