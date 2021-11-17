import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSpeechContext } from '@speechly/react-client'
import formatDuration from 'format-duration'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../utils/database'
import { ISRCC } from '../utils/rules'
import { isEmpty } from '../utils/actions'
import { useTimer } from '../utils/useTimer'
import Navigation from '../components/Navigation'
import Button from '../components/Button'
import RuleRow from '../components/RuleRow'
import Spinner from '../components/Spinner'
import './Competition.css'

function Competition() {
  const history = useHistory()
  const allDrivers = useLiveQuery(() => db.drivers.toArray(), [])
  const currentDriver = useLiveQuery(() => db.drivers.get({ isCurrent: 1 }), {})
  const { isRunning, elapsedTime, startTimer, stopTimer, setElapsedTime} = useTimer()
  const { segment } = useSpeechContext()
  const [prevEntityIndex, setPrevEntityIndex] = useState(-1)

  useEffect(() => {
    if (!isEmpty(segment?.entities)) {
      const { entities } = segment
      const entityIndex = entities.length - 1
      const ruleId = Number(entities[entityIndex].value)
      if (prevEntityIndex < entityIndex) {
        const value = currentDriver.points[ruleId] || 0
        updatePoints(ruleId, value + 1)
        setPrevEntityIndex(entityIndex)
      }
    }
    if (segment?.isFinal) {
      setPrevEntityIndex(-1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment])

  const updatePoints = async (ruleId, value) => {
    if (isNaN(ruleId) || isNaN(value) || value < 0) return
    const rule = ISRCC.find(r => r.id === ruleId)
    if (rule.max && value > rule.max) return
    await db.drivers.where({ isCurrent: 1 }).modify(d => { d.points[ruleId] = value })
  }

  const setPrevDriver = async () => {
    stopTimer()
    const currentIndex = allDrivers.findIndex(driver => driver.id === currentDriver.id)
    const prevDriver = allDrivers.at(currentIndex - 1)
    await db.transaction('rw', db.drivers, async () => {
      db.drivers.update(currentDriver.id, { isCurrent: 0, elapsedTime })
      db.drivers.update(prevDriver.id, { isCurrent: 1 })
    })
    setElapsedTime(prevDriver.elapsedTime)
  }

  const setNextDriver = async () => {
    stopTimer()
    const currentIndex = allDrivers.findIndex(driver => driver.id === currentDriver.id)
    const nextDriver = allDrivers.at(currentIndex + 1) || allDrivers.at(0)
    await db.transaction('rw', db.drivers, async () => {
      db.drivers.update(currentDriver.id, { isCurrent: 0, elapsedTime })
      db.drivers.update(nextDriver.id, { isCurrent: 1 })
    })
    setElapsedTime(nextDriver.elapsedTime)
  }

  const pauseTimer = async () => {
    stopTimer()
    await db.drivers.update(currentDriver.id, { elapsedTime })
  }

  const onTimerPress = () => isRunning ? pauseTimer() : startTimer()

  const onEndCompetition = () => {
    if (window.confirm("End competition?")) {
      history.push('/finish')
    }
  }

  if (isEmpty(currentDriver)) return <Spinner />

  return (
    <>
    <Navigation
      title={currentDriver.name}
      subtitle={formatDuration(elapsedTime * 100)}
      leftClickFn={setPrevDriver}
      rightClickFn={setNextDriver}
    />
    <div className="Competition">
      {ISRCC.map(rule =>
        <RuleRow
          key={rule.id}
          rule={rule}
          value={currentDriver.points[rule.id]}
          stepperFn={updatePoints} />
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
