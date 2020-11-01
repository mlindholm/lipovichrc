import React, { useState } from 'react'
import './Competition.css'
import Stepper from './Stepper'
import { courseRules } from './courseRules'
import { ReactComponent as LeftIcon } from './images/chevron-left.svg'
import { ReactComponent as RightIcon } from './images/chevron-right.svg'
import { ReactComponent as HelpIcon } from './images/help.svg'

function Competition({drivers, endFunc, updateFunc}) {
  const [currentDriver, setCurrentDriver] = useState(drivers[0])
  const handleDriverChange = event => {
    const newDriver = drivers.find(driver => driver.id === Number(event.target.value))
    setCurrentDriver(newDriver)
  }

  return (
    <>
    <div className="Navigation">
      <button className="Navigation__Button"><LeftIcon /></button>
      <div className="Navigation__Title">
        <select className="Navigation__DriverSelect" value={currentDriver.id} onChange={handleDriverChange}>
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
            <Stepper
              value={currentDriver.points[rule.id] || 0}
              maxValue={rule.max}
              driverId={currentDriver.id}
              ruleId={rule.id}
              updateFunc={updateFunc}
            />
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
