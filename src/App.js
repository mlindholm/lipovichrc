import React from 'react'
import { useIdb } from 'react-use-idb'
import './App.css'
import Registration from './Registration'
import Competition from './Competition'
import { AppStates } from './Enums'

function App() {
  const [currentState, setCurrentState] = useIdb('state', AppStates.Register)
  const [drivers, setDrivers] = useIdb('drivers')

  const startCompetition = data => {
    setCurrentState(AppStates.Compete)
    setDrivers(data)
  }

  const confirmEndCompetition = () => {
    if (window.confirm("End competition?")) {
      setCurrentState(AppStates.Finished)
    }
  }

  const undoEndCompetition = () => {
    setCurrentState(AppStates.Compete)
  }

  const restartCompetition = () => {
    setCurrentState(AppStates.Register)
    setDrivers(undefined)
  }

  if (!drivers && currentState === AppStates.Register) return <Registration startFunc={startCompetition} />
  if (drivers && currentState === AppStates.Compete) return <Competition drivers={drivers} endFunc={confirmEndCompetition} />
  if (drivers && currentState === AppStates.Finished) return (
    <div className="Registration">
      <h1>Finished!</h1>
      <button onClick={restartCompetition}>Restart</button>&ensp;
      <button onClick={undoEndCompetition}>Undo</button>
    </div>
  )
  return null
}

export default App;
