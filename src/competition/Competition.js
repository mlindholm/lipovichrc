import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Navigation from '../navigation/Navigation'
import { courseRules } from '../utils/courseRules'
import { ReactComponent as HelpIcon } from '../images/help.svg'
import { ReactComponent as AddIcon } from '../images/add.svg'
import { ReactComponent as RemoveIcon } from '../images/remove.svg'
import './Competition.css'
import Button from '../button/Button'

function Competition({drivers, endFunc, changeDriverFunc, updatePointsFunc}) {
  const history = useHistory()
  const currentDriver = drivers.find(driver => driver.current)
  const currentIndex = drivers.findIndex(driver => driver.current)

  const prevDriver = () => {
    const index = currentIndex === 0 ? drivers.length : currentIndex
    changeDriverFunc(drivers[index - 1].id)
  }

  const nextDriver = () => {
    const index = currentIndex === drivers.length - 1 ? -1 : currentIndex
    changeDriverFunc(drivers[index + 1].id)
  }

  const renderStepper = (ruleId, max) => {
    const value = currentDriver.points[ruleId] || 0
    const handleClick = (int, max) => {
      const newValue = value + int
      if (newValue < 0 || newValue > max) return
      updatePointsFunc(currentDriver.id, ruleId, newValue)
    }

    return (
      <div className="Stepper">
        <button className="Stepper__Button" onClick={() => handleClick(-1)}><RemoveIcon width={18} height={18} /></button>
        <div className="Stepper__Input" type="number">{value}</div>
        <button className="Stepper__Button" onClick={() => handleClick(1, max)}><AddIcon width={18} height={18} /></button>
      </div>
    )
  }

  const confirmEndCompetition = useCallback(() => {
    if (window.confirm("End competition?")) {
      endFunc()
      history.push('/finish')
    }
  }, [endFunc, history])

  return (
    <>
    <Navigation
      title={(
        <select className="Navigation__Select" value={currentDriver.id} onChange={e=> changeDriverFunc(e.target.value)}>
          {drivers.map(driver => <option key={driver.id} value={driver.id}>{driver.name}</option>)}
        </select>
      )}
      leftOnClick={prevDriver}
      rightOnClick={nextDriver}
    />
    <div className="Competition">
      {courseRules.map(rule => (
        <div key={rule.name} className="CourseRule">
          <div>
            <div className="CourseRule__Name">{rule.name}</div>
            <div className="CourseRule__Points">
              {rule.points > 0 && '+'}{rule.points}
              {rule.description && (
                <button className="CourseRule__HelpButton" onClick={() => alert(rule.description)}><HelpIcon width={17} height={17} /></button>
              )}
            </div>
          </div>
          {renderStepper(rule.id, rule.max)}
        </div>
      ))}
    </div>
    <div className="Competition__Footer">
      <Button onClick={confirmEndCompetition} color="secondary">End Competition</Button>
      <a className="Button Button--secondary" target="_blank" href="http://www.sorrca.com/rules/2021coursepoints.pdf" rel="noopener noreferrer" >SORRCA Course Points</a>
    </div>
    </>
  )
}

export default Competition
