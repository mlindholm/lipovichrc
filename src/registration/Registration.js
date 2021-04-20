import React, { useState } from 'react'
import Navigation from '../navigation/Navigation'
import InstallPWA from '../pwa/InstallPWA'
import { ReactComponent as CloseIcon } from '../images/close.svg'
import './Registration.css'
import Button from '../button/Button'

const driverObj = id => ({
  id,
  name: '',
  points: {},
  current: false
})

function Registration({startFunc}) {
  const [count, setCount] = useState(1)
  const [drivers, setDrivers] = useState([driverObj(count)])

  const updateDriver = id => event => {
    const newArray = drivers.map(driver =>
      driver.id === id ? { ...driver, name: event.target.value } : driver
    )
    setDrivers(newArray)
  }

  const addDriver = () => {
    const newArray = [...drivers, driverObj(count + 1)]
    setDrivers(newArray)
    setCount(count + 1)
  }

  const removeDriver = id => {
    const newArray = [...drivers].filter(item => item.id !== id)
    setDrivers(newArray)
  }

  return (
    <>
      <Navigation title="Registration" />
      <div className="Registration">
        {drivers.map(driver => (
          <div key={driver.id} className="Registration__Row">
            <input
              name="name"
              type="text"
              className="Registration__Input"
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
        <Button onClick={() => addDriver()} color="primary">Add Driver</Button>
        <Button linkTo="/compete" onClick={() => startFunc(drivers)} color="primary">Start Competition</Button>
      </div>
      <InstallPWA />
    </>
  )
}

export default Registration
