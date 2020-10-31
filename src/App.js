import React from 'react'
import { useIdb } from 'react-use-idb'
import './App.css'
import RegisterDrivers from './RegisterDrivers'
import Competition from './Competition'

function App() {
  const [drivers] = useIdb('drivers')

  if (!drivers) return <RegisterDrivers />
  return drivers && <Competition drivers={drivers} />
}

export default App;
