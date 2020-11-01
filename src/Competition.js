import React, { useState } from 'react'
import './Competition.css'
import './Stepper.css'
import { courseRules } from './courseRules'
import { ReactComponent as LeftIcon } from './images/chevron-left.svg'
import { ReactComponent as RightIcon } from './images/chevron-right.svg'
import { ReactComponent as HelpIcon } from './images/help.svg'
import { ReactComponent as AddIcon } from './images/add.svg'
import { ReactComponent as RemoveIcon } from './images/remove.svg'

function Competition({drivers, currentDriver, endFunc, changeDriverFunc, updatePointsFunc}) {

  const getRuleCount = id => {
    if (!currentDriver || !currentDriver.points) return 0
    return currentDriver.points[id] || 0
  }

  const renderStepper = (id, max) => {
    const value = getRuleCount(id)
    const handleClick = (int, max) => {
      const newValue = value + int
      if (newValue < 0 || newValue > max) return
      updatePointsFunc(currentDriver.id, id, newValue)
    }

    return (
      <div className="Stepper">
        <button className="Stepper__Button" onClick={() => handleClick(-1)}><RemoveIcon width={20} height={20} /></button>
        <div className="Stepper__Input" type="number">{value}</div>
        <button className="Stepper__Button" onClick={() => handleClick(1, max)}><AddIcon width={20} height={20} /></button>
      </div>
    )
  }

  return (
    <>
    <div className="Navigation">
      <button className="Navigation__Button"><LeftIcon /></button>
      <div className="Navigation__Title">
        <select className="Navigation__DriverSelect" value={currentDriver.id} onChange={e=> changeDriverFunc(e.target.value)}>
          {drivers.map(driver => <option key={driver.id} value={driver.id}>{driver.name}</option>)}
        </select>
        {/* <div className="Navigation__Course">Course 1</div> */}
      </div>
      <button className="Navigation__Button"><RightIcon /></button>
    </div>
    <div className="Competition">
      {courseRules.map(rule => (
          <div key={rule.name} className="CourseRule">
            <div>
              <div className="CourseRule__Name">{rule.name}</div>
              <div className="CourseRule__Points">{rule.points > 0 && '+'}{rule.points}</div>
            </div>
            <button className="CourseRule__HelpButton" onClick={() => alert(rule.description)}><HelpIcon width={20} height={20} /></button>
            {renderStepper(rule.id, rule.max)}
          </div>
        ))}
    </div>
    <div className="Footer">
      {/* <div className="Footer__ButtonContainer">
        <button className="Footer__Button">
          <LeftIcon width={21} height={21} />
          Prev. Course
        </button>
        <button className="Footer__Button">
          Next Course
          <RightIcon width={21} height={21} />
          </button>
      </div> */}
      <button className="Footer__SecondaryButton" onClick={endFunc}>End Competition</button>
    </div>
    </>
  )
}

export default Competition
