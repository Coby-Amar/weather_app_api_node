import { JsonDB, Config } from 'node-json-db';

const db = new JsonDB(new Config('wearther_db', true, false))

interface User {
    id: string
    name: string
    password: string
}

class DbService {
    private static users: User[] = []
    constructor() {
        db.exists('/users').then(result => {
            if (result) {
                db.getData('/users').then((data) => DbService.users = data)
            } else {
                db.push('/users', [])
            }
        })
    }
    addUser(user: User) {
        DbService.users.push(user)
        db.push('/user',DbService.users)
    }
    getUser(username: string) {
        return DbService.users.find(({ name }) => username == name)
    }
}

export const DBService = new DbService() 