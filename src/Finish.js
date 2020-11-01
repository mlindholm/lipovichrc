import React from 'react'
import { courseRules } from './courseRules'

function Finish({drivers, restartFunc, undoEndFunc}) {
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
              {drivers.map(driver => <th>{driver.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {courseRules.map(rule => (
              <tr>
                <td>{rule.name} <small style={{color:'gray'}}>{rule.points > 0 && '+'}{rule.points}</small></td>
                {drivers.map(driver => {
                  const points = driver.points[rule.id] * rule.points || 0
                  return <td>{points}</td>
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              {drivers.map(driver => {
                const totalPoints = courseRules
                .map(rule => driver.points[rule.id] * rule.points)
                .filter(v => !isNaN(v))
                .reduce((a, b) => a + b, 0)
                return <td>{totalPoints}</td>
              })}
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