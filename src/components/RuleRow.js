import React, { useEffect, useState } from 'react'
import classnames from 'classnames-minimal'
import { ReactComponent as HelpIcon } from '../images/help.svg'
import { ReactComponent as AddIcon } from '../images/add.svg'
import { ReactComponent as RemoveIcon } from '../images/remove.svg'
import './RuleRow.css'
import useIsMounted from '../utils/useIsMounted'

export default function RuleRow({ rule, value = 0, stepperFn }) {
  const [animate, setAnimate] = useState(false)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (value === 0) return
    if (navigator.vibrate) {
      window.navigator.vibrate(20)
    }
    setAnimate(a => !a)
    setTimeout(() => {
      setAnimate(a => !a)
    }, 500)
  }, [value]);

  const className = classnames({
    RuleRow: true,
    'RuleRow--animated': isMounted && animate
  })

  return (
    <div className={className}>
      <div>
        <div className="RuleRow__Name">{rule.name}</div>
        <div className="RuleRow__Points">
          {rule.label}
          {rule.description && (
            <button className="RuleRow__HelpButton" onClick={() => alert(rule.description)}><HelpIcon width={17} height={17} /></button>
          )}
        </div>
      </div>
      <div className="Stepper">
        <button className="Stepper__Button" onClick={() => stepperFn(rule.id, value - 1)}><RemoveIcon width={18} height={18} /></button>
        <div className="Stepper__Input" type="number">{value}</div>
        <button className="Stepper__Button" onClick={() => stepperFn(rule.id, value + 1)}><AddIcon width={18} height={18} /></button>
      </div>
    </div>
  )
}
