import React, { useEffect, useState } from 'react'
import { useIdb } from 'react-use-idb'
import { useHistory } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Button from '../components/Button'
import { isEmpty } from '../utils/actions'
import { ReactComponent as CloseIcon } from '../images/close.svg'
import './Registration.css'

const driverObj = id => ({
  id,
  name: '',
  points: [{}],
  elapsedTime: 0
})

function Registration() {
  const history = useHistory()
  const [tmpDrivers, setTmpDrivers] = useState([driverObj(0)])
  const [drivers, setDrivers] = useIdb('drivers')

  useEffect(() => {
    if(isEmpty(drivers)) return
    history.push('/compete')
  }, [drivers, history])

  const addDriver = () => {
    const newArray = [...tmpDrivers, driverObj(tmpDrivers.length)]
    setTmpDrivers(newArray)
  }

  const updateDriver = id => event => {
    const newArray = tmpDrivers.map(driver =>
      driver.id === id ? { ...driver, name: event.target.value } : driver
    )
    setTmpDrivers(newArray)
  }

  const removeDriver = id => {
    const newArray = [...tmpDrivers].filter(item => item.id !== id)
    if (isEmpty(newArray)) return setTmpDrivers([driverObj(0)])
    setTmpDrivers(newArray)
  }

  const startCompetition = () => {
    const filteredDrivers = tmpDrivers.filter(driver => driver.name !== '')
    if (isEmpty(filteredDrivers)) return null
    setDrivers(filteredDrivers)
  }

  return (
    <>
      <Navigation title="New Competition" />
      <div className="Registration">
        {tmpDrivers.map(driver => (
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
        <Button onClick={addDriver} color="primary">Add Driver</Button>
        <Button onClick={startCompetition} color="primary">Start Competition</Button>
      </div>
    </>
  )
}

export default Registration
