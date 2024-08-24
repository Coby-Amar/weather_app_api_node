import dotenv from 'dotenv'

dotenv.config()

export class ConstanceService {
    static MAX_COOKIE_AGE = 1000 * 60*60*24*7
    static get IS_DEV() {
        return process.env.MODE === 'dev'
    }
    static get IS_PROD() {
        return process.env.MODE !== 'dev'
    } 
    static get JWT_TOKEN_NAME() {
        return process.env.JWT_TOKEN_NAME
    } 
    static get JWT_SECRET_KEY() {
        return process.env.JWT_SECRET_KEY
    } 
}
