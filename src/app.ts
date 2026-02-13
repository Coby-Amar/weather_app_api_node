import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import routes from '@routes'
import { ConstanceService } from 'services/consts.service'
import { morganMiddleware } from 'middleware/morgan.middleware'

const app = express()
if (ConstanceService.ALLOWED_CORS) {
    app.use(cors({
        origin: ConstanceService.ALLOWED_CORS,
        credentials: true,
    }))
}
app.use(morganMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes)

app.get('*', (req, res) => {
    res.sendFile('whoops.html', { root: __dirname })

})

const port = process.env.PORT
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${port}`)
})

export default app;