import { useEffect, useState } from 'react'
import { AtlasProvider, useAtlas } from './state/AtlasContext.jsx'
import Scene from './scene/Scene.jsx'
import Hud from './ui/Hud.jsx'
import InfoPanel from './ui/InfoPanel.jsx'
import ComparePanel from './ui/ComparePanel.jsx'
import AtlasPanel from './ui/AtlasPanel.jsx'
import Intro from './ui/Intro.jsx'
import { validateAtlas } from './data/locations.js'

export default function App() {
  return (
    <AtlasProvider>
      <Shell />
    </AtlasProvider>
  )
}

function Shell() {
  const { overlay, closeOverlay, clear, selectedId } = useAtlas()
  const [introOpen, setIntroOpen] = useState(true)

  // Report any stop that has drifted from the atlas schema. Dev-only, never fatal.
  useEffect(() => {
    const problems = validateAtlas()
    if (problems.length) {
      console.warn('[Intermaptic] atlas schema problems:', problems)
    }
  }, [])

  // Escape backs out of the overlay stack, then out of the stop selection.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (introOpen) {
        setIntroOpen(false)
        return
      }
      if (overlay !== 'none') {
        closeOverlay()
        return
      }
      if (selectedId) clear()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [introOpen, overlay, closeOverlay, clear, selectedId])

  return (
    <div className="app-shell">
      <div className="scene-layer">
        <Scene />
      </div>

      <div className="hud-layer">
        <Hud />
        <InfoPanel />
        <AtlasPanel />
        <ComparePanel />
      </div>

      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-overlay" aria-hidden="true" />

      <Intro open={introOpen} onDismiss={() => setIntroOpen(false)} />
    </div>
  )
}
