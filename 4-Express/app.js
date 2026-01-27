import express from 'express'
import {jobsRouter} from './routes/jobs.js'
import {corsMiddleware} from './middlewares/cors.js'
import { DEFAULTS } from './config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

const ACCEPTED_ORIGINS = [
    'http://localhost:1234',
    'http://localhost:5173'
]

app.use(corsMiddleware())
app.use(express.json())

app.use('/jobs', jobsRouter)

if(process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'){
    app.listen(PORT, () =>{
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})
}

export default app