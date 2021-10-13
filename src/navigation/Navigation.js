import React from 'react'
import { ReactComponent as LeftIcon } from '../images/chevron-left.svg'
import { ReactComponent as RightIcon } from '../images/chevron-right.svg'
import './Navigation.css'

export default function Navigation({title, subtitle, leftClickFn, rightClickFn}) {
  return (
    <div className="Navigation">
      {leftClickFn && <button className="Navigation__Button" onClick={leftClickFn}><LeftIcon /></button>}
      <div className="Navigation__Title-container">
        <h2 className="Navigation__Title">{title}</h2>
        {subtitle && <span className="Navigation__Subtitle">{subtitle}</span>}
      </div>
      {rightClickFn && <button className="Navigation__Button" onClick={rightClickFn}><RightIcon /></button>}
    </div>
  )
}
