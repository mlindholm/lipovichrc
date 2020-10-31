import React, { useState, useEffect } from 'react'
import { get } from 'idb-keyval'
import './App.css'
import RegisterDrivers from './RegisterDrivers'
import { ReactComponent as LeftIcon } from './images/chevron-left.svg'
import { ReactComponent as RightIcon } from './images/chevron-right.svg'
import { ReactComponent as AddIcon } from './images/add.svg'
import { ReactComponent as RemoveIcon } from './images/remove.svg'

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    async function fetchDrivers() {
      const drivers = await get('drivers')
      setData(drivers)
    }
    fetchDrivers()
  })

  if (!data) return <RegisterDrivers />


  return (
    <>
    <div className="Navigation">
      <button className="Navigation__Button"><LeftIcon /></button>
      <div>
        <select className="Navigation__DriverSelect">
          {data.map(driver => <option key={driver.id} value={driver.id}>{driver.name}</option>)}
        </select>
        <div className="Navigation__Course">Course 1</div>
      </div>
      <button className="Navigation__Button"><RightIcon /></button>
    </div>
    <div className="App">
      <div className="Stepper__Container">
        <div>
          <div className="Stepper__Label">Progress</div>
          <div className="Stepper__Points">-2 points</div>
        </div>
        <div className="Stepper">
          <button className="Stepper__Button"><RemoveIcon /></button>
          <input className="Stepper__Input" type="text" value="00" />
          <button className="Stepper__Button"><AddIcon /></button>
        </div>
      </div>
      <div className="Stepper__Container">
        <div>
          <div className="Stepper__Label">Reverse</div>
          <div className="Stepper__Points">+1 point</div>
        </div>
        <div className="Stepper">
          <button className="Stepper__Button"><RemoveIcon /></button>
          <input className="Stepper__Input" type="text" value="00" />
          <button className="Stepper__Button"><AddIcon /></button>
        </div>
      </div>
      <div className="Stepper__Container">
        <div>
          <div className="Stepper__Label">Gate Marker:</div>
          <div className="Stepper__Points">+10 points</div>
        </div>
        <div className="Stepper">
          <button className="Stepper__Button"><RemoveIcon /></button>
          <input className="Stepper__Input" type="text" value="00" />
          <button className="Stepper__Button"><AddIcon /></button>
        </div>
      </div>
    </div>
    <div className="Footer">
      <div className="Footer__ButtonContainer">
        <button className="Footer__Button">&larr; Prev. Course</button>
        <button className="Footer__Button">Next Course &rarr;</button>
      </div>
      <div className="Footer__ButtonContainer">
        <button className="Footer__SecondaryButton">End Race?</button>
        <button className="Footer__SecondaryButton">SORRCA Rules</button>
      </div>
    </div>
    </>
  );
}

export default App;
