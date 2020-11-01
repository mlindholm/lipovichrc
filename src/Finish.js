import React from 'react'
import { courseRules } from './courseRules'

const pointsForId = (arr, id) => arr.find(v => v.id === Number(id)).points

function Finish({drivers, restartFunc, undoEndFunc}) {
  return (
    <>
      <div className="Navigation">
        <h2 className="Navigation__Title">Finished</h2>
      </div>
      <div className="Registration">
        <table>
          <thead>
            <th></th>
            {drivers.map(driver => <th>{driver.name}</th>)}
          </thead>
          <tbody>
            {courseRules.map(rule => (
              <tr>
                <td>{rule.name}, {rule.points > 0 && '+'}{rule.points}</td>
                {drivers.map(driver => {
                  const points = driver.points[rule.id] * rule.points || 0
                  return <td>{points}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={restartFunc}>Restart</button>&ensp;
        <button onClick={undoEndFunc}>Undo</button>
      </div>
    </>
  )
}

export default Finish