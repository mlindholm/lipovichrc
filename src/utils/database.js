import Dexie from 'dexie'

export const db = new Dexie('lipovichrc')
db.version(1).stores({
    drivers: `++id, name, elapsedTime, points, isCurrent`
})
