import React, { useState } from 'react'
import { useIdb } from 'react-use-idb'
import './RegisterDrivers.css'
import { ReactComponent as CloseIcon } from './images/close.svg'

function RegisterDrivers() {
  const [count, setCount] = useState(0)
  const [drivers, setDrivers] = useIdb('drivers', [{ id: count, name: '' }])

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

  const startRace = () => {
    var newArray = drivers.filter(value => value.name !== '')
    setDrivers(newArray)
  }

  return (
    <div className="RegisterDrivers">
      <h3>Enter Drivers</h3>
      {drivers.map(driver => (
        <div key={driver.id} className="RegisterDrivers__Row">
          <input
            autoFocus
            type="text"
            value={driver.name}
            placeholder="Name"
            onChange={updateDriver(driver.id)}
            onKeyPress={event => event.key === 'Enter' && addDriver()}
          />
          {driver.name && (
            <div className="RegisterDrivers__RemoveRow" onClick={() => removeDriver(driver.id)}>
              <CloseIcon width={20} height={20} />
            </div>
          )}
        </div>
        )
        )}
      <button className="RegisterDrivers__Button" onClick={() => addDriver()}>Add Driver</button>
      <button className="RegisterDrivers__Button" onClick={() => startRace()}>Start Comp</button>
    </div>
  )
}

export default RegisterDrivers
