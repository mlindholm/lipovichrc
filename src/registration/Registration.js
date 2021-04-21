import React, { useState } from 'react'
import { useIdb } from 'react-use-idb'
import Navigation from '../navigation/Navigation'
import Button from '../button/Button'
import { prepareDrivers } from '../utils/actions'
import { ReactComponent as CloseIcon } from '../images/close.svg'
import './Registration.css'

const driverObj = id => ({
  id,
  name: '',
  points: {},
  current: false
})

function Registration({startFunc}) {
  const [, setDrivers] = useIdb('drivers')
  const [localDrivers, setLocalDrivers] = useState([driverObj(1)])

  const updateDriver = id => event => {
    const newArray = localDrivers.map(driver =>
      driver.id === id ? { ...driver, name: event.target.value } : driver
    )
    setLocalDrivers(newArray)
  }

  const addDriver = () => {
    const newArray = [...localDrivers, driverObj(localDrivers.length + 1)]
    setLocalDrivers(newArray)
  }

  const removeDriver = id => {
    const newArray = [...localDrivers].filter(item => item.id !== id)
    setLocalDrivers(newArray)
  }

  const startCompetition = () => {
    const finalDrivers = prepareDrivers(localDrivers)
    setDrivers(finalDrivers)
  }

  return (
    <>
      <Navigation title="Registration" />
      <div className="Registration">
        {localDrivers.map(driver => (
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
        <Button linkTo="/compete" onClick={startCompetition} color="primary">Start Competition</Button>
      </div>
    </>
  )
}

export default Registration
