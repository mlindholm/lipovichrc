import { courseRules } from './rules'

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

export const calculateTotal = points => {
  return courseRules
    .map(rule => points[rule.id] * rule.points)
    .filter(v => !isNaN(v))
    .reduce((a, b) => a + b, 0)
}

export const getCurrentDriver = (array, id) => {
  const index = array.findIndex(driver => driver.id === id)
  return {...array[index], index}
}

export const setDriverPoints = (ruleId, value, array, id) => {
  const newArray = array.map(driver =>
    driver.id === id ? { ...driver, points: { ...driver.points, [ruleId]: value } } : driver
  )
  return newArray
}