import React from 'react'
import { courseRules } from './courseRules'


function Finish({drivers, restartFunc, undoEndFunc}) {
  const medals = {
    0: '🥇',
    1: '🥈',
    2: '🥉'
  }

  return (
    <>
      <div className="Navigation">
        <h2 className="Navigation__Title">Finished</h2>
      </div>
      <div className="Registration">
        <table>
          <thead>
            <tr>
              <th/>
              {drivers.map((driver, i) => <th>{driver.name} {medals[i]}</th>)}
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
              {drivers.map(driver => <td>{driver.total}</td>)}
            </tr>
          </tfoot>
        </table>
        <button onClick={restartFunc}>New Competition</button>&ensp;
        <button className="Footer__SecondaryButton" onClick={undoEndFunc}>Return to Competition</button>
      </div>
    </>
  )
}

export default Finish