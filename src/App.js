import React, { useEffect } from 'react'
import { useIdb } from 'react-use-idb'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Registration from './registration/Registration'
import Competition from './competition/Competition'
import Finish from './finish/Finish'
import { AppStates } from './utils/Enums'
import { courseRules } from './utils/courseRules'
import './App.css'

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

  const endCompetition = () => {
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

  const undoEndCompetition = () => {
    setAppState(AppStates.Compete)
  }

  const restartCompetition = () => {
    setAppState(AppStates.Register)
    setDrivers(undefined)
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <Registration startFunc={startCompetition} />
        </Route>
        <Route path="/compete">
          <Competition
            drivers={drivers}
            changeDriverFunc={changeCurrentDriver}
            updatePointsFunc={updateDriverPoints}
            endFunc={endCompetition}
          />
        </Route>
        <Route path="/finish">
          <Finish
            drivers={drivers}
            undoEndFunc={undoEndCompetition}
            restartFunc={restartCompetition}
          />
        </Route>
        <Route exact path="/">
          <Redirect to="/register" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
