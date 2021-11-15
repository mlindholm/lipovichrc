import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSpeechContext } from '@speechly/react-client'
import formatDuration from 'format-duration'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../utils/database'
import { courseRules } from '../utils/rules'
import { isEmpty } from '../utils/actions'
import { useTimer } from '../utils/useTimer'
import Navigation from '../components/Navigation'
import Button from '../components/Button'
import CourseRule from '../components/CourseRule'
import Spinner from '../components/Spinner'
import './Competition.css'

function Competition() {
  const history = useHistory()
  const allDrivers = useLiveQuery(() => db.drivers.toArray(), [])
  const currentDriver = allDrivers && allDrivers.find(d => d.isCurrent)
  const { isRunning, elapsedTime, startTimer, stopTimer, setElapsedTime} = useTimer()
  const { segment } = useSpeechContext()
  const [segmentPosition, setSegmentPosition] = useState(-1)

  useEffect(() => {
    if (!isEmpty(segment?.entities)) {
      const entityArr = segment.entities
      const ruleId = Number(entityArr[entityArr.length - 1].value)
      const value = currentDriver?.points[ruleId] || 0
      const updatePoints = async (id, newValue) => await db.drivers.where({ id: currentDriver.id }).modify(d => { d.points[id] = newValue })

      if (segmentPosition < entityArr.length - 1) {
        updatePoints(ruleId, value + 1)
        setSegmentPosition(entityArr.length - 1)
      }
    }
    if (segment?.isFinal) {
      setSegmentPosition(-1)
    }
  }, [segment])


  const setPrevDriver = async () => {
    stopTimer()
    const currentIndex = allDrivers.findIndex(driver => driver.id === currentDriver.id)
    const prevDriver = allDrivers.at(currentIndex - 1)
    await db.transaction('rw', db.drivers, async () => {
      db.drivers.update(currentDriver.id, { isCurrent: false, elapsedTime })
      db.drivers.update(prevDriver.id, { isCurrent: true })
    })
    setElapsedTime(prevDriver.elapsedTime)
  }

  const setNextDriver = async () => {
    stopTimer()
    const currentIndex = allDrivers.findIndex(driver => driver.id === currentDriver.id)
    const nextDriver = allDrivers.at(currentIndex + 1) || allDrivers.at(0)
    await db.transaction('rw', db.drivers, async () => {
      db.drivers.update(currentDriver.id, { isCurrent: false, elapsedTime })
      db.drivers.update(nextDriver.id, { isCurrent: true })
    })
    setElapsedTime(nextDriver.elapsedTime)
  }

  const onEndCompetition = () => {
    if (window.confirm("End competition?")) {
      history.push('/finish')
    }
  }

  const pauseTimer = async () => {
    stopTimer()
    await db.drivers.update(currentDriver.id, { elapsedTime })
  }

  const onTimerPress = () => isRunning ? pauseTimer() : startTimer()

  const onDriverPointsChange = async (id, value, max) => {
    if (value < 0 || value > max) return
    await db.drivers.where({ id: currentDriver.id }).modify(d => { d.points[id] = value })
  }

  if (isEmpty(allDrivers)) return <Spinner />

  return (
    <>
    <Navigation
      title={currentDriver?.name}
      subtitle={formatDuration(elapsedTime * 100)}
      leftClickFn={setPrevDriver}
      rightClickFn={setNextDriver}
    />
    <div className="Competition">
      {courseRules.map(rule =>
        <CourseRule
          key={rule.id}
          rule={rule}
          value={currentDriver?.points[rule.id] || 0}
          stepperFn={onDriverPointsChange} />
      )}
    </div>
    <div className="Competition__Footer">
      <Button onClick={onEndCompetition} color="secondary">End Competition</Button>
      <Button onClick={onTimerPress} color="primary">{isRunning ? 'Pause' : 'Start'} Timer</Button>
    </div>
    </>
  )
}

export default Competition
