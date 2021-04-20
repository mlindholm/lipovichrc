import React, { useCallback } from 'react'
import { useHistory } from "react-router-dom";
import Navigation from '../navigation/Navigation'
import Button from '../button/Button';
import { courseRules } from '../utils/courseRules'
import './Finish.css'


function Finish({drivers, restartFunc}) {
  const history = useHistory()
  const medals = [
    {icon: '🏆', color: '#ffec99'},
    {icon: '🥈', color: '#e9ecef'},
    {icon: '🥉', color: '#f0ddd1'},
  ]

  const confirmRestart = useCallback(() => {
    if (window.confirm('Start new competition?')) {
      restartFunc()
      history.push('/register')
    }
  }, [restartFunc, history])

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