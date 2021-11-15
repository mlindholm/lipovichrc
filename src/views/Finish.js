import React from 'react'
import { useHistory } from 'react-router-dom'
import formatDuration from 'format-duration'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../utils/database'
import { calculateTotal, isEmpty } from '../utils/actions'
import { courseRules } from '../utils/rules'
import Navigation from '../components/Navigation'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import './Finish.css'

function Finish() {
  const history = useHistory()
  const allDrivers = useLiveQuery(() => db.drivers.toArray(), []);

  const medals = [
    {icon: '🥇', suffix: 'first'},
    {icon: '🥈', suffix: 'second'},
    {icon: '🥉', suffix: 'third'},
  ]

  const confirmRestart = async () => {
    if (window.confirm('Start a new competition?')) {
      await db.drivers.clear()
      history.push('/register')
    }
  }

  if (isEmpty(allDrivers)) return <Spinner />

  return (
    <>
      <Navigation title="Finished" />
      <div className="Finish">
        <div className="Finish__Podium">
          {allDrivers && allDrivers
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
                {allDrivers && allDrivers.map(driver => <th><strong>{driver.name}</strong><br/>{formatDuration(driver.elapsedTime * 100)}</th>)}
              </tr>
            </thead>
            <tbody>
              {courseRules.map(rule => (
                <tr>
                  <td>{rule.name}</td>
                  {allDrivers && allDrivers.map(driver => <td>{driver.points[rule.id] * rule.points || 0}</td>)}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total points</strong></td>
                {allDrivers && allDrivers.map(driver => <td><strong>{calculateTotal(driver.points)}</strong></td>)}
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
