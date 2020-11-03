import React, { useEffect, useState } from 'react'
import './InstallPWA.css'

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState(null)

  useEffect(() => {
    const handler = e => {
      e.preventDefault()
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('transitionend', handler)
  }, [])

  const onClick = e => {
    e.preventDefault()
    if (!promptInstall) return
    promptInstall.prompt()
  }

  if (!supportsPWA) return null
  return (
    <div className="InstallPWA">
      <div className="InstallPWA__Content">
        <img className="InstallPWA__AppIcon" src="/logo-192.png" alt="App icon" />
        <div>
          <h3 className="InstallPWA__Title">Lipovich</h3>
          <p className="InstallPWA__Description">Add to Home screen</p>
        </div>
        <button className="InstallPWA__Button" onClick={onClick}>Install</button>
      </div>
    </div>
  )
}

export default InstallPWA
