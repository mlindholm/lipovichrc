import React from 'react'
import { courseRules } from './courseRules'


function Finish({drivers, restartFunc, undoEndFunc}) {
  const sortedDriversWithTotal = drivers.map(driver => {
    const total = courseRules
    .map(rule => driver.points[rule.id] * rule.points)
    .filter(v => !isNaN(v))
    .reduce((a, b) => a + b, 0)
    return {...driver, total }
  }).sort((a, b) => a.total - b.total)

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
              {sortedDriversWithTotal.map((driver, i) => <th>{driver.name} {medals[i]}</th>)}
            </tr>
          </thead>
          <tbody>
            {courseRules.map(rule => (
              <tr>
                <td>{rule.name} <small style={{color:'gray'}}>{rule.points > 0 && '+'}{rule.points}</small></td>
                {sortedDriversWithTotal.map(driver => <td>{driver.points[rule.id] * rule.points || 0}</td>)}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              {sortedDriversWithTotal.map(driver => <td>{driver.total}</td>)}
            </tr>
          </tfoot>
        </table>
        <button onClick={restartFunc}>Restart</button>&ensp;
        <button className="Footer__SecondaryButton" onClick={undoEndFunc}>Undo</button>
      </div>
    </>
  )
}

export default Finish