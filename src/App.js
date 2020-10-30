import React, { useState, useEffect } from 'react'
import { get, set } from 'idb-keyval'
import './App.css'
import { ReactComponent as CloseIcon } from './images/close.svg'

function App() {
  const [count, setCount] = useState(0);
  const [drivers, setDrivers] = useState([{ id: count, name: '' }])

  useEffect(() => {
    set('drivers', drivers)
  }, [drivers])

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
    console.log(newArray)
  }

  return (
    <div className="App">
      <div className="RegisterDrivers">
        <h3>Enter Drivers</h3>
        {drivers.map(driver => (
          <div key={driver.id} className="RegisterDrivers__Row">
            <input
              autoFocus
              type="text"
              value={driver.name}
              onChange={updateDriver(driver.id)}
              onKeyPress={event => event.key === 'Enter' && addDriver()}
              />
            <div className="RegisterDrivers__RemoveRow" onClick={() => removeDriver(driver.id)}>
              <CloseIcon />
            </div>
          </div>
          )
          )}
        <button onClick={() => addDriver()}>Add Driver</button>
        <button onClick={() => startRace()}>Start Race</button>
      </div>
    </div>
  );
}

export default App;
