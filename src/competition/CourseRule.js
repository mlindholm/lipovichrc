import React, { useEffect, useState } from 'react'
import classnames from 'classnames-minimal'
import { ReactComponent as HelpIcon } from '../images/help.svg'
import { ReactComponent as AddIcon } from '../images/add.svg'
import { ReactComponent as RemoveIcon } from '../images/remove.svg'
import './CourseRule.css'

export default function CourseRule({ rule, value, fn }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    window.navigator.vibrate(20)
    setAnimate(a => !a)
    setTimeout(() => {
      setAnimate(a => !a)
    }, 1000)
  }, [value]);

  const courseRuleClassName = classnames({
    CourseRule: true,
    'CourseRule--animated': animate
  })

  return (
    <div key={rule.name} className={courseRuleClassName}>
      <div>
        <div className="CourseRule__Name">{rule.name}</div>
        <div className="CourseRule__Points">
          {rule.label}
          {rule.description && (
            <button className="CourseRule__HelpButton" onClick={() => alert(rule.description)}><HelpIcon width={17} height={17} /></button>
          )}
        </div>
      </div>
      <div className="Stepper">
        <button className="Stepper__Button" onClick={() => fn(rule.id, value - 1)}><RemoveIcon width={18} height={18} /></button>
        <div className="Stepper__Input" type="number">{value}</div>
        <button className="Stepper__Button" onClick={() => fn(rule.id, value + 1, rule.max)}><AddIcon width={18} height={18} /></button>
      </div>
    </div>
  )
}
