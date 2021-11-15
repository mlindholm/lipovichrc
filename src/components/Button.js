import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames-minimal'
import './Button.css'

export default function Button({ children, onClick, linkTo, color }) {
  const className = classnames({
    Button: true,
    'Button--primary': color === 'primary',
    'Button--secondary': color === 'secondary',
  })

  if (linkTo) {
    return (
      <Link className={className} to={linkTo} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
