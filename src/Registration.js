import React, { useState } from 'react'
import './Registration.css'
import { ReactComponent as CloseIcon } from './images/close.svg'

function Registration({startFunc}) {
  const [count, setCount] = useState(0)
  const [drivers, setDrivers] = useState([{
    id: count,
    name: '',
    points: {}
  }])

  const updateDriver = id => event => {
    const newArray = drivers.map(driver =>
      driver.id === id ? { ...driver, name: event.target.value } : driver
    )
    setDrivers(newArray)
  }

  const addDriver = () => {
    const newArray = [...drivers, { id: count + 1, name: '', points: {}}]
    setDrivers(newArray)
    setCount(count + 1)
  }

  const removeDriver = id => {
    const newArray = [...drivers].filter(item => item.id !== id)
    setDrivers(newArray)
  }

  return (
    <>
      <div className="Navigation">
        <h2 className="Navigation__Title">Registration</h2>
      </div>
      <div className="Registration">
        {drivers.map(driver => (
          <div key={driver.id} className="Registration__Row">
            <input
              name="name"
              type="text"
              autoFocus={true}
              autoComplete="off"
              value={driver.name}
              placeholder="Driver Name"
              onChange={updateDriver(driver.id)}
              onKeyPress={event => event.key === 'Enter' && addDriver()}
            />
            {driver.name && (
              <div className="Registration__RemoveRow" onClick={() => removeDriver(driver.id)}>
                <CloseIcon width={18} height={18} />
              </div>
            )}
          </div>
        ))}
        <button className="Registration__Button" onClick={() => addDriver()}>Add Driver</button>
        <button className="Registration__Button" onClick={() => startFunc(drivers)}>Start Competition</button>
      </div>
    </>
  )
}

export default Registration
