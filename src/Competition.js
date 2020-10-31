import React from 'react'
import './Competition.css'
import { ReactComponent as LeftIcon } from './images/chevron-left.svg'
import { ReactComponent as RightIcon } from './images/chevron-right.svg'
import { ReactComponent as AddIcon } from './images/add.svg'
import { ReactComponent as RemoveIcon } from './images/remove.svg'

function Competition({drivers, endFunc}) {
  return (
    <>
    <div className="Navigation">
      <button className="Navigation__Button"><LeftIcon /></button>
      <div>
        <select className="Navigation__DriverSelect">
          {drivers.map(driver => <option key={driver.id} value={driver.id}>{driver.name}</option>)}
        </select>
        <div className="Navigation__Course">Course 1</div>
      </div>
      <button className="Navigation__Button"><RightIcon /></button>
    </div>
    <div className="Competition">
      <div className="Stepper__Container">
        <div>
          <div className="Stepper__Label">Progress</div>
          <div className="Stepper__Points">-2 points</div>
        </div>
        <div className="Stepper">
          <button className="Stepper__Button"><RemoveIcon width={20} height={20} /></button>
          <input className="Stepper__Input" type="text" value="00" />
          <button className="Stepper__Button"><AddIcon width={20} height={20} /></button>
        </div>
      </div>
      <div className="Stepper__Container">
        <div>
          <div className="Stepper__Label">Reverse</div>
          <div className="Stepper__Points">+1 point</div>
        </div>
        <div className="Stepper">
          <button className="Stepper__Button"><RemoveIcon width={20} height={20} /></button>
          <input className="Stepper__Input" type="text" value="00" />
          <button className="Stepper__Button"><AddIcon width={20} height={20} /></button>
        </div>
      </div>
      <div className="Stepper__Container">
        <div>
          <div className="Stepper__Label">Gate Marker:</div>
          <div className="Stepper__Points">+10 points</div>
        </div>
        <div className="Stepper">
          <button className="Stepper__Button"><RemoveIcon width={20} height={20} /></button>
          <input className="Stepper__Input" type="text" value="00" />
          <button className="Stepper__Button"><AddIcon width={20} height={20} /></button>
        </div>
      </div>
    </div>
    <div className="Footer">
      <div className="Footer__ButtonContainer">
        <button className="Footer__Button"><LeftIcon width={20} height={20} /> Prev. Course</button>
        <button className="Footer__Button">Next Course <RightIcon width={20} height={20} /></button>
      </div>
      <button className="Footer__SecondaryButton" onClick={endFunc}>End Competition</button>
    </div>
    </>
  )
}

export default Competition
