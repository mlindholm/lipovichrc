import React from 'react'
import { useIdb } from 'react-use-idb'
import { useHistory } from 'react-router-dom'
import formatDuration from 'format-duration'
import { calculateTotal, isEmpty } from '../utils/actions'
import { courseRules } from '../utils/rules'
import Navigation from '../components/Navigation'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import './Finish.css'

function Finish() {
  const history = useHistory()
  const [drivers, setDrivers] = useIdb('drivers')
  const [, setCurrentDriverId] = useIdb('current-driver-id')

  const medals = [
    {icon: '🥇', suffix: 'first'},
    {icon: '🥈', suffix: 'second'},
    {icon: '🥉', suffix: 'third'},
  ]

  const confirmRestart = () => {
    if (window.confirm('Start a new competition?')) {
      setDrivers(undefined)
      setCurrentDriverId(undefined)
      history.push('/register')
    }
  }

  if (isEmpty(drivers)) return <Spinner />

  return (
    <>
      <Navigation title="Finished" />
      <div className="Finish">
        <div className="Finish__Podium">
          {drivers
            .sort((a, b) => calculateTotal(a.points) - calculateTotal(b.points))
            .slice(0,3)
            .map((driver, i) => (
              <div className={`Podium__Entry Podium__Entry--${medals[i].suffix}`}>
                <div className="Podium__Medal">
                  {medals[i].icon}
                </div>
                <div className="Podium__Name">
                  {driver.name}
                </div>
                <div className="Podium__Points">
                  {calculateTotal(driver.points)} pts<br/>
                  {formatDuration(driver.elapsedTime * 100)}
                </div>
              </div>
            ))
          }
        </div>
        <div className="Finish__TableContainer">
          <table className="Finish__Table">
            <thead>
              <tr>
                <th><strong>Breakdown</strong></th>
                {drivers.map(driver => <th><strong>{driver.name}</strong><br/>{formatDuration(driver.elapsedTime * 100)}</th>)}
              </tr>
            </thead>
            <tbody>
              {courseRules.map(rule => (
                <tr>
                  <td>{rule.name}</td>
                  {drivers.map(driver => <td>{driver.points[rule.id] * rule.points || 0}</td>)}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total points</strong></td>
                {drivers.map(driver => <td><strong>{calculateTotal(driver.points)}</strong></td>)}
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="Finish__Footer">
          <Button onClick={confirmRestart} color="primary">New Competition</Button>
          <Button linkTo="/compete" color="secondary">Return to Competition</Button>
        </div>
      </div>
    </>
  )
}

export default Finish
