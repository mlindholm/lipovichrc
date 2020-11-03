import React, { useEffect, useState } from 'react'
import './InstallPWA.css'

const InstallPWA = () => {
  const [show, setShow] = useState(true)
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState(null)

  useEffect(() => {
    const handler = e => {
      e.preventDefault()
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    const hideIfInstalled = () => {
      if (navigator.standalone) {
        setShow(false)
      }
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setShow(false)
      }
    }
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('DOMContentLoaded', hideIfInstalled)
    return () => window.removeEventListener('transitionend', handler)
  }, [])

  const onClick = e => {
    e.preventDefault()
    setShow(false)
    if (!promptInstall) return
    promptInstall.prompt()
    promptInstall.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        setShow(false)
      } else {
        setShow(true)
      }
    })
  }

  if (!supportsPWA) return null
  if (show) return (
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
  return null
}

export default InstallPWA
