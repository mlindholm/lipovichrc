import Dexie from 'dexie'

export const db = new Dexie('mydb')
db.version(1).stores({
    drivers: `++id, name, elapsedTime, points, isCurrent`
})
