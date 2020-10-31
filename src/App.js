import React from 'react'
import { useIdb } from 'react-use-idb'
import './App.css'
import Registration from './Registration'
import Competition from './Competition'
import { AppStates } from './Enums'

const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

function App() {
  const [currentState, setCurrentState] = useIdb('state', AppStates.Register)
  const [drivers, setDrivers] = useIdb('drivers')

  const startCompetition = data => {
    if (isEmpty(data)) return
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

  if (isEmpty(drivers) && currentState === AppStates.Register) return <Registration startFunc={startCompetition} />
  if (!isEmpty(drivers) && currentState === AppStates.Compete) return <Competition drivers={drivers} endFunc={confirmEndCompetition} />
  if (!isEmpty(drivers) && currentState === AppStates.Finished) return (
    <div className="Registration">
      <h2 className="Registration__Title">Finished!</h2>
      <button onClick={restartCompetition}>Restart</button>&ensp;
      <button onClick={undoEndCompetition}>Undo</button>
    </div>
  )
  return null
}

export default App;
