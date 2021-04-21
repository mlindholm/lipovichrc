import { courseRules } from './rules'

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

export const changeDriver = (drivers, newDriverId) => {
  const currentIndex = drivers.findIndex(driver => driver.current)
  const newIndex = drivers.findIndex(driver => driver.id === Number(newDriverId))
  const newArray = [...drivers]
  newArray[currentIndex].current = false
  newArray[newIndex].current = true
  return newArray
}

export const updatePoints = (drivers, driverId, ruleId, value) => {
  const newArray = drivers.map(driver =>
    driver.id === driverId ? { ...driver, points: { ...driver.points, [ruleId]: value } } : driver
  )
  return newArray
}

export const calculatePoints = drivers => {
  const sortedDriversWithTotal = drivers.map(driver => {
    const total = courseRules
      .map(rule => driver.points[rule.id] * rule.points)
      .filter(v => !isNaN(v))
      .reduce((a, b) => a + b, 0)
    return {...driver, total }
  }).sort((a, b) => a.total - b.total)
  return sortedDriversWithTotal
}