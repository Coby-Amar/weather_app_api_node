import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import routes from './routes'
import { ConstanceService } from './services/consts.service'

const app = express()
if (ConstanceService.IS_DEV) {
    app.use(cors())
}
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes)

const port = process.env.PORT
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${port}`)
})

export default app;