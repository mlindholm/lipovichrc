import React from 'react'
import { useHistory } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../utils/database'
import Navigation from '../components/Navigation'
import Button from '../components/Button'
import { ReactComponent as CloseIcon } from '../images/close.svg'
import './Registration.css'

function Registration() {
  const history = useHistory()
  const allDrivers = useLiveQuery(() => db.drivers.toArray(), []);

  const addDriver = async () => {
    await db.drivers.add({ name: '', isCurrent: false, points: {}, elapsedTime: 0 })
  }

  const updateDriver = async (id, name) => {
    await db.drivers.update(id, { name })
  }

  const removeDriver = async id => {
    await db.drivers.delete(id)
  }

  const startCompetition = async () => {
    const firstDriver = allDrivers.filter(d => d.name !== '').shift()
    await db.drivers.where({ name: '' }).delete()
    await db.drivers.update(firstDriver.id, { isCurrent: true })
    history.push('/compete')
  }

  return (
    <>
      <Navigation title="New Competition" />
      <div className="Registration">
        {allDrivers && allDrivers.map(driver => (
          <div key={driver.id} className="Registration__Row">
            <input
              name="name"
              type="text"
              className="Registration__Input"
              autoFocus={true}
              autoComplete="off"
              value={driver.name}
              placeholder="Driver Name"
              onChange={e => updateDriver(driver.id, e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addDriver()}
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
