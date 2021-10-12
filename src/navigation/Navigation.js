import React from 'react'
import { ReactComponent as LeftIcon } from '../images/chevron-left.svg'
import { ReactComponent as RightIcon } from '../images/chevron-right.svg'
import './Navigation.css'

export default function Navigation({title, subtitle, leftOnClick, rightOnClick}) {
  return (
    <div className="Navigation">
      {leftOnClick && <button className="Navigation__Button" onClick={leftOnClick}><LeftIcon /></button>}
      <div className="Navigation__Title-container">
        <h2 className="Navigation__Title">{title}</h2>
        {subtitle && <span className="Navigation__Subtitle">{subtitle}</span>}
      </div>
      {rightOnClick && <button className="Navigation__Button" onClick={rightOnClick}><RightIcon /></button>}
    </div>
  )
}
