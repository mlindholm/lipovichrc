import React from 'react'
import { useIdb } from 'react-use-idb'
import { useHistory } from "react-router-dom";
import Navigation from '../navigation/Navigation'
import Button from '../button/Button';
import { isEmpty } from '../utils/actions'
import { courseRules } from '../utils/rules'
import './Finish.css'


function Finish({restartFunc}) {
  const history = useHistory()
  const [drivers, setDrivers] = useIdb('drivers')

  const medals = [
    {icon: '🏆', color: '#ffec99'},
    {icon: '🥈', color: '#e9ecef'},
    {icon: '🥉', color: '#f0ddd1'},
  ]

  const confirmRestart = () => {
    if (window.confirm('Start new competition?')) {
      setDrivers(undefined)
      history.push('/register')
    }
  }

  if (isEmpty(drivers)) return null

  return (
    <>
      <Navigation title="Finished" />
      <div className="Finish">
        <div className="Finish__Podium">
          {drivers.slice(0,3).map((driver, i) => (
            <div className="Podium__Entry" style={{backgroundColor: medals[i].color}}>
              <div className="Podium__Medal">
                {medals[i].icon}
              </div>
              <div className="Podium__Name">
                {driver.name}
              </div>
              <div className="Podium__Points">
                {driver.total} points
              </div>
            </div>
          ))}
        </div>
        <div className="Finish__TableContainer">
          <table className="Finish__Table">
            <thead>
              <tr>
                <th>Breakdown</th>
                {drivers.map(driver => <th>{driver.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {courseRules.map(rule => (
                <tr>
                  <td>{rule.name} <small style={{color:'gray'}}>{rule.points > 0 && '+'}{rule.points}</small></td>
                  {drivers.map(driver => <td>{driver.points[rule.id] * rule.points || 0}</td>)}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total</strong></td>
                {drivers.map(driver => <td><strong>{driver.total}</strong></td>)}
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="Finish__Footer">
          <Button linkTo="/compete" color="secondary">Return to Competition</Button>
          <Button onClick={confirmRestart} color="primary">New Competition</Button>
        </div>
      </div>
    </>
  )
}

export default Finish