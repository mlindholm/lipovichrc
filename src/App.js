import React, { useState, useEffect } from 'react'
import { get } from 'idb-keyval'
import './App.css'
import RegisterDrivers from './RegisterDrivers'

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
    <div className="App">
      <h3>Stage 1, Driver 1</h3>
      {data.map(driver => <p>{JSON.stringify(driver)}</p>)}
      <button>Previous Stage</button>
      <button>Next Stage</button>
      <button>End Race</button>
    </div>
  );
}

export default App;
