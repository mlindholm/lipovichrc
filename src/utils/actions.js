import { courseRules } from './rules'

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

export const calculateTotal = points => {
  return courseRules
    .map(rule => points[rule.id] * rule.points)
    .filter(v => !isNaN(v))
    .reduce((a, b) => a + b, 0)
}
