import React from 'react'
import { useIdb } from 'react-use-idb'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Registration from './registration/Registration'
import Competition from './competition/Competition'
import Finish from './finish/Finish'
import ScrollToTop from './utils/ScrollToTop'
import { courseRules } from './utils/courseRules'
import './App.css'

const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

function App() {
  const [drivers, setDrivers] = useIdb('drivers')

  const startCompetition = data => {
    const filteredData = data.filter(value => value.name !== '')
    if (isEmpty(filteredData)) return
    filteredData[0].current = true
    setDrivers(filteredData)
  }

  const changeCurrentDriver = newDriverId => {
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
    setDrivers(sortedDriversWithTotal)
  }

  const restartCompetition = () => {
    setDrivers(undefined)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
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
