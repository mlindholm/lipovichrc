import React from 'react'
import { useIdb } from 'react-use-idb'
import { useHistory } from 'react-router-dom'
import Navigation from '../navigation/Navigation'
import Button from '../button/Button'
import { courseRules } from '../utils/rules'
import { isEmpty } from '../utils/actions'
import { ReactComponent as HelpIcon } from '../images/help.svg'
import { ReactComponent as AddIcon } from '../images/add.svg'
import { ReactComponent as RemoveIcon } from '../images/remove.svg'
import './Competition.css'

function Competition() {
  const history = useHistory()
  const [drivers, setDrivers] = useIdb('drivers')
  const [currentDriverId, setCurrentDriverId] = useIdb('current-driver-id', 0)

  if (isEmpty(drivers)) return null

  const getCurrentDriver = () => {
    const index = drivers.findIndex(driver => driver.id === currentDriverId)
    return {...drivers[index], index}
  }

  const setDriverPoints = (ruleId, value) => {
    const newArray = drivers.map(driver =>
      driver.id === currentDriverId ? { ...driver, points: { ...driver.points, [ruleId]: value } } : driver
    )
    setDrivers(newArray)
  }

  const setPrevDriver = () => {
    const prevDriver = drivers.at(getCurrentDriver().index - 1)
    setCurrentDriverId(prevDriver.id)
  }

  const setNextDriver = () => {
    const nextDriver = drivers.at(getCurrentDriver().index + 1) || drivers.at(0)
    setCurrentDriverId(nextDriver.id)
  }

  const confirmEndCompetition = () => {
    if (window.confirm("End competition?")) {
      history.push('/finish')
    }
  }

  const renderStepper = (ruleId, max, callbackFn) => {
    const value = getCurrentDriver().points[ruleId] || 0
    const handleClick = (int, max) => {
      const newValue = value + int
      if (newValue < 0 || newValue > max) return
      setDriverPoints(ruleId, newValue)
    }

    return (
      <div className="Stepper">
        <button className="Stepper__Button" onClick={() => handleClick(-1)}><RemoveIcon width={18} height={18} /></button>
        <div className="Stepper__Input" type="number">{value}</div>
        <button className="Stepper__Button" onClick={() => handleClick(1, max)}><AddIcon width={18} height={18} /></button>
      </div>
    )
  }

  return (
    <>
    <Navigation
      title={(
        <select className="Navigation__Select" value={currentDriverId} onChange={e => setCurrentDriverId(Number(e.target.value))}>
          {drivers.map(driver => <option key={driver.id} value={driver.id}>{driver.name}</option>)}
        </select>
      )}
      leftOnClick={setPrevDriver}
      rightOnClick={setNextDriver}
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
      <Button linkTo="/register" color="secondary">Edit Drivers</Button>
    </div>
    </>
  )
}

export default Competition
