import React, { useEffect, useState } from 'react'
import './InstallPWA.css'

const InstallPWA = () => {
  const [isMobile, setIsMobile] = useState()
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState(null)

  useEffect(() => {
    const handler = e => {
      e.preventDefault()
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    const hideInstalled = () => {
      if (navigator.standalone) setSupportsPWA(false)
      if (window.matchMedia('(display-mode: standalone)').matches) setSupportsPWA(false)
    }
    setIsMobile(window.innerWidth < 720)
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('DOMContentLoaded', hideInstalled)
    return () => window.removeEventListener('transitionend', handler)
  }, [])

  const onClick = e => {
    e.preventDefault()
    setSupportsPWA(false)
    if (!promptInstall) return
    promptInstall.prompt()
    promptInstall.userChoice.then(choice =>
      setSupportsPWA(choice.outcome === 'dismissed')
    )
  }

  if (!supportsPWA) return null

  return (
    <div className="InstallPWA">
      <div className="InstallPWA__Content">
        <img className="InstallPWA__AppIcon" src="/logo-192.png" alt="App icon" />
        <div>
          <h3 className="InstallPWA__Title">{isMobile ? 'Add to Home screen' : 'Install app'}</h3>
          <p className="InstallPWA__Description">Lipovich</p>
        </div>
        <button className="InstallPWA__Button" onClick={onClick}>{isMobile ? 'Add' : 'Install'}</button>
      </div>
    </div>
  )
}

export default InstallPWA
