import React, { useState } from 'react'
import './Registration.css'
import { ReactComponent as CloseIcon } from './images/close.svg'

function Registration({startFunc}) {
  const [count, setCount] = useState(0)
  const [drivers, setDrivers] = useState([{ id: count, name: '' }])

  const updateDriver = id => event => {
    const index = drivers.findIndex(driver => driver.id === id);
    const newArray = [...drivers]
    newArray[index] = { id, name: event.target.value }
    setDrivers(newArray)
  }

  const addDriver = () => {
    const newArray = [...drivers, { id: count + 1, name: '' }]
    setDrivers(newArray)
    setCount(count + 1)
  }

  const removeDriver = id => {
    const newArray = [...drivers].filter(item => item.id !== id)
    setDrivers(newArray)
  }

  const start = () => {
    var newArray = drivers.filter(value => value.name !== '')
    startFunc(newArray)
  }

  return (
    <>
      <div className="Navigation">
        <h2 className="Navigation__Title">Enter Drivers</h2>
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
              placeholder="Name"
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
        <button className="Registration__Button" onClick={() => start()}>Start Competition</button>
      </div>
    </>
  )
}

export default Registration
