import React, { useEffect } from 'react'
import { useIdb } from 'react-use-idb'
import Registration from './Registration'
import Competition from './Competition'
import Finish from './Finish'
import { AppStates } from './Enums'
import { courseRules } from './courseRules'
import './App.css'
import './Navigation.css'

const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

function App() {
  const [appState, setAppState] = useIdb('state', AppStates.Register)
  const [drivers, setDrivers] = useIdb('drivers')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [appState])

  const startCompetition = data => {
    const filteredData = data.filter(value => value.name !== '')
    if (isEmpty(filteredData)) return
    filteredData[0].current = true
    setDrivers(filteredData)
    setAppState(AppStates.Compete)
  }

  const changeCurrentDriver = (newDriverId) => {
    const currentIndex = drivers.findIndex(driver => driver.current)
    const newIndex = drivers.findIndex(driver => driver.id === Number(newDriverId))
    const newArray = [...drivers]
    newArray[currentIndex].current = false
    newArray[newIndex].current = true
    setDrivers(newArray)
  }

  const updateDriverPoints = (driverId, ruleId, value) => {
    const newArray = drivers.map(driver =>
      driver.id === driverId ? { ...driver, points: { ...driver.points, [ruleId]: value } } : driver
    )
    setDrivers(newArray)
  }

  const confirmEndCompetition = () => {
    if (window.confirm("End competition?")) {
      const sortedDriversWithTotal = drivers.map(driver => {
        const total = courseRules
        .map(rule => driver.points[rule.id] * rule.points)
        .filter(v => !isNaN(v))
        .reduce((a, b) => a + b, 0)
        return {...driver, total }
      }).sort((a, b) => a.total - b.total)
      setAppState(AppStates.Finished)
      setDrivers(sortedDriversWithTotal)
    }
  }

  const undoEndCompetition = () => {
    setAppState(AppStates.Compete)
  }

  const restartCompetition = () => {
    setAppState(AppStates.Register)
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
