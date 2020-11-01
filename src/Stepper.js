import React, { useState } from 'react'
import './Stepper.css'
import { ReactComponent as AddIcon } from './images/add.svg'
import { ReactComponent as RemoveIcon } from './images/remove.svg'

const Stepper = ({max, driverId, ruleId, updateFunc}) => {
  const [value, setValue] = useState(0)
  const handleClick = (int, max) => {
    const newValue = value + int
    if (newValue < 0 || newValue > max) return
    setValue(newValue)
    updateFunc(driverId, ruleId, newValue)
  }

  return (
    <div className="Stepper">
      <button className="Stepper__Button" onClick={() => handleClick(-1)}><RemoveIcon width={20} height={20} /></button>
      <div className="Stepper__Input" type="number">{value}</div>
      <button className="Stepper__Button" onClick={() => handleClick(1, max)}><AddIcon width={20} height={20} /></button>
    </div>
  )
}

export default Stepper