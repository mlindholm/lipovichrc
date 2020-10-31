import React from 'react'

function Finish({restartFunc, undoEndFunc}) {
  return (
    <>
      <div className="Navigation">
        <h2 className="Navigation__Title">Finished</h2>
      </div>
      <div className="Registration">
        <button onClick={restartFunc}>Restart</button>&ensp;
        <button onClick={undoEndFunc}>Undo</button>
      </div>
    </>
  )
}

export default Finish