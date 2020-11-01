import React from 'react'
import { useIdb } from 'react-use-idb'
import './App.css'
import './Navigation.css'
import Registration from './Registration'
import Competition from './Competition'
import Finish from './Finish'
import { AppStates } from './Enums'

const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

function App() {
  const [currentState, setCurrentState] = useIdb('state', AppStates.Register)
  const [drivers, setDrivers] = useIdb('drivers')

  const startCompetition = data => {
    if (isEmpty(data)) return
    const filteredData = data.filter(value => value.name !== '')
    setCurrentState(AppStates.Compete)
    setDrivers(filteredData)
  }

  const updateDriverPoints = (driverId, ruleId, value) => {
    //  const driver = drivers.find(v => v.id === driverId)
     const newArray = drivers.map(driver =>
      driver.id === driverId ? { ...driver, points: { ...driver.points, [ruleId]: value } } : driver
    )
    console.log(newArray)
    setDrivers(newArray)
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

  if (isEmpty(drivers) && currentState === AppStates.Register) return (
    <Registration
      startFunc={startCompetition}
    />
  )
  if (!isEmpty(drivers) && currentState === AppStates.Compete) return (
    <Competition
      drivers={drivers}
      endFunc={confirmEndCompetition}
      updateFunc={updateDriverPoints}
    />
  )
  if (!isEmpty(drivers) && currentState === AppStates.Finished) return (
    <Finish
      drivers={drivers}
      undoEndFunc={undoEndCompetition}
      restartFunc={restartCompetition}
    />
  )
  return null
}

export default App
