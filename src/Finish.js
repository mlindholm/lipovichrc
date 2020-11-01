import React from 'react'

function Finish({drivers, restartFunc, undoEndFunc}) {
  return (
    <>
      <div className="Navigation">
        <h2 className="Navigation__Title">Finished</h2>
      </div>
      <div className="Registration">
        <div style={{background:'#eee',padding:16,marginBottom:16}}>
          <code>{JSON.stringify(drivers)}</code>
        </div>
        <button onClick={restartFunc}>Restart</button>&ensp;
        <button onClick={undoEndFunc}>Undo</button>
      </div>
    </>
  )
}

export default Finish