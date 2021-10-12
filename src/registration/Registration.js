import React from 'react'
import { useIdb } from 'react-use-idb'
import { useHistory } from 'react-router-dom'
import Navigation from '../navigation/Navigation'
import Button from '../button/Button'
import { isEmpty } from '../utils/actions'
import { ReactComponent as CloseIcon } from '../images/close.svg'
import './Registration.css'

const driverObj = id => ({
  id,
  name: '',
  points: {},
  elapsedTime: 0
})

function Registration({startFunc}) {
  const history = useHistory()
  const [drivers, setDrivers] = useIdb('drivers', [driverObj(0)])
  const [currentDriverId, setCurrentDriverId] = useIdb('current-driver-id', 0)

  const addDriver = () => {
    const newArray = [...drivers, driverObj(drivers.length)]
    setDrivers(newArray)
  }

  const updateDriver = id => event => {
    const newArray = drivers.map(driver =>
      driver.id === id ? { ...driver, name: event.target.value } : driver
    )
    setDrivers(newArray)
  }

  const removeDriver = id => {
    const newArray = [...drivers].filter(item => item.id !== id)
    setDrivers(newArray)
  }

  const startCompetition = () => {
    const filteredDrivers = drivers.filter(driver => driver.name !== '')
    if (isEmpty(filteredDrivers)) return null
    setDrivers(filteredDrivers)
    setCurrentDriverId(currentDriverId || filteredDrivers[0].id)
    history.push('/compete')
  }

  return (
    <>
      <Navigation title={`${currentDriverId ? 'Edit' : 'Register'} Drivers`} />
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
        <Button onClick={startCompetition} color="primary">{currentDriverId ? 'Resume' : 'Start'} Competition</Button>
      </div>
    </>
  )
}

export default Registration
