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
  const [appState, setAppState] = useIdb('state', AppStates.Register)
  const [drivers, setDrivers] = useIdb('drivers')
  const [currentDriver, setCurrentDriver] = useIdb('currentDriver')

  const startCompetition = data => {
    if (isEmpty(data)) return
    const filteredData = data.filter(value => value.name !== '')
    setDrivers(filteredData)
    setCurrentDriver(filteredData[0])
    setAppState(AppStates.Compete)
  }

  const changeCurrentDriver = (newDriverId) => {
    const newDriver = drivers.find(driver => driver.id === Number(newDriverId))
    setCurrentDriver(newDriver)
  }

  const updateDriverPoints = (driverId, ruleId, value) => {
    const newArray = drivers.map(driver =>
      driver.id === driverId ? { ...driver, points: { ...driver.points, [ruleId]: value } } : driver
    )
    const newDriver = newArray.find(driver => driver.id === driverId)
    setCurrentDriver(newDriver)
    setDrivers(newArray)
  }

  const confirmEndCompetition = () => {
    if (window.confirm("End competition?")) {
      setAppState(AppStates.Finished)
    }
  }

  const undoEndCompetition = () => {
    setAppState(AppStates.Compete)
  }

  const restartCompetition = () => {
    setAppState(AppStates.Register)
    setCurrentDriver(undefined)
    setDrivers(undefined)
  }

  if (isEmpty(drivers) && appState === AppStates.Register) return (
    <Registration
      startFunc={startCompetition}
    />
  )
  if (!isEmpty(drivers) && appState === AppStates.Compete) return (
    <Competition
      drivers={drivers}
      currentDriver={currentDriver}
      changeDriverFunc={changeCurrentDriver}
      updatePointsFunc={updateDriverPoints}
      endFunc={confirmEndCompetition}
    />
  )
  if (!isEmpty(drivers) && appState === AppStates.Finished) return (
    <Finish
      drivers={drivers}
      undoEndFunc={undoEndCompetition}
      restartFunc={restartCompetition}
    />
  )
  return null
}

export default App
