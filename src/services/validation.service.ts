class ValidationsService {
    requredField(body: object, fields: string[]) {
        const keys = Object.keys(body)
        for(const field in fields) {
            if (!keys.includes(field)) {
                return false
            }
        }        
    }
}

export const ValidationService = new ValidationsService() 