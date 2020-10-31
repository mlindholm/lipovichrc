import React from 'react'
import './Competition.css'
import Stepper from './Stepper'
import { coursePoints } from './coursePoints'
import { ReactComponent as LeftIcon } from './images/chevron-left.svg'
import { ReactComponent as RightIcon } from './images/chevron-right.svg'
import { ReactComponent as HelpIcon } from './images/help.svg'

function Competition({drivers, endFunc}) {
  return (
    <>
    <div className="Navigation">
      <button className="Navigation__Button"><LeftIcon /></button>
      <div className="Navigation__Title">
        <select className="Navigation__DriverSelect">
          {drivers.map(driver => <option key={driver.id} value={driver.id}>{driver.name}</option>)}
        </select>
        <div className="Navigation__Course">Course 1</div>
      </div>
      <button className="Navigation__Button"><RightIcon /></button>
    </div>
    <div className="Competition">
      {coursePoints.map(item => (
        <div key={item.name} className="CoursePoint">
          <div>
            <div className="CoursePoint__Name">{item.name}</div>
            <div className="CoursePoint__Points">{item.points > 0 ? '+' + item.points : item.points}</div>
          </div>
          <button className="CoursePoint__HelpButton" onClick={() => alert(item.description)}><HelpIcon width={20} height={20} /></button>
          <Stepper max={item.max} />
        </div>
      ))}
    </div>
    <div className="Footer">
      <div className="Footer__ButtonContainer">
        <button className="Footer__Button">
          <LeftIcon width={21} height={21} />
          Prev. Course
        </button>
        <button className="Footer__Button">
          Next Course
          <RightIcon width={21} height={21} />
          </button>
      </div>
      <button className="Footer__SecondaryButton" onClick={endFunc}>End Competition</button>
    </div>
    </>
  )
}

export default Competition
