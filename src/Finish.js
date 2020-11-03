import React from 'react'
import { courseRules } from './courseRules'
import './Finish.css'


function Finish({drivers, restartFunc, undoEndFunc}) {
  const medals = [
    {icon: '🏆', color: '#ffec99'},
    {icon: '🥈', color: '#e9ecef'},
    {icon: '🥉', color: '#f0ddd1'},
  ]

  return (
    <>
      <div className="Navigation">
        <h2 className="Navigation__Title">Finished</h2>
      </div>
      <div className="Finish">
        <div className="Finish__Podium">
          {drivers.slice(0,3).map((driver, i) => (
            <div className="Podium__Entry" style={{backgroundColor: medals[i].color}}>
              <div class="Podium__Medal">
                {medals[i].icon}
              </div>
              <div class="Podium__Name">
                {driver.name}
              </div>
              <div class="Podium__Points">
                {driver.total} points
              </div>
            </div>
          ))}
        </div>
        <div className="Finish__TableContainer">
          <table className="Finish__Table">
            <thead>
              <tr>
                <th>Brakedown</th>
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
                <td>Total</td>
                {drivers.map(driver => <td><strong>{driver.total}</strong></td>)}
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="Finish__Footer">
          <button className="Finish__Button" onClick={restartFunc}>New Competition</button>
          <button className="Finish__SecondaryButton" onClick={undoEndFunc}>Return to Competition</button>
        </div>
      </div>
    </>
  )
}

export default Finish