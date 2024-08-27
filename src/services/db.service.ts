import { JsonDB, Config } from 'node-json-db';

import { User } from '$types/db';
import { ForcastWeatherDetails } from '$types/weather';

const db = new JsonDB(new Config('wearther_db', true, false))

class DbService {
    constructor() {
        db.exists('/users').then(result => {
            if (!result) {
                db.push('/users', [])
            }
        })
        db.exists('/forcasts').then(result => {
            if (!result) {
                db.push('/forcasts', {})
            }
        })
    }
    async addUser(user: User) {
        const users: User[] = await db.getData('/users')
        users.push(user)
        db.push('/users', users)
    }
    async getUser(name: string) {
        const users: User[] = await db.getData('/users')
        return users.find(({ username }) => username == name)
    }
    async getUserById(userId: string) {
        const users: User[] = await db.getData('/users')
        return users.find(({ id }) => id == userId)
    }
    async deleteUserAndForcastsById(userId: string) {
        const users: User[] = await db.getData('/users')
        const foundIndex = users.findIndex(({ id }) => id == userId)
        if (foundIndex > -1) {
            users.splice(foundIndex, 1)
            await this.deleteUserForcasts(userId)
        }
    }
    async getUsersForcasts(userId: string): Promise<ForcastWeatherDetails[]> {
        const path = '/forcasts/'+userId
        const exists = await db.exists(path)
        if (exists) {
            return db.getData(path)
        } 
        return []
    }
    async addUserForcast(userId:string, forcast: ForcastWeatherDetails) {
        const result = await this.getUsersForcasts(userId)
        result.push(forcast)
        db.push('/forcasts/'+userId, result)
    }
    async deleteUserForcasts(userId:string) {
        return db.delete('/forcasts/'+userId)
    }
}

export const DBService = new DbService() 