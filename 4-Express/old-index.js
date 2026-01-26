import express from 'express'
import jobs from './data/jobs.json' with { type: 'json' }
import { DEFAULTS } from './config.js'
import cors from 'cors'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

const ACCEPTED_ORIGINS = [
    'http://localhost:1234',
    'http://localhost:5173'
]

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true)
            if(ACCEPTED_ORIGINS.includes(origin)) return callback(null, true)
            return callback(new Error('Origin not allowed '))
        }
    })
)
app.use(express.json())

app.use((req, res, next)=>{
    const timeString = new Date().toLocaleDateString()
    console.log(`[${timeString}] ${req.method} ${req.url}`)
    next()
})

app.get('/',(req, res)=>{
    res.send('Hello World')
})

app.get('/health',(req, res)=>{
    return res.json({
        status: 'ok',
        uptime: process.uptime()
    })
})

app.get('/jobs',(req, res)=>{
    const {text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET} = req.query

    let filteredJobs = jobs

    if(text){
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job=>
            job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
        )
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber+limitNumber)

    return res.json({ data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber })
})

app.get('/jobs/:id', (req, res)=>{
    const { id } = req.params

    const job = jobs.find(job => job.id === id)

    if(!job) return res.status(404).json({ error: 'Job not found'})
    
    return res.json(job)
})

app.put('/jobs:id', (req,res)=>{

})

app.patch('/jobs:id', (req,res)=>{

})

app.post('/jobs', (req,res)=>{
    const { titulo, empresa, ubicacion, data} = req.body

    const newJob ={
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion,
        data
    }

    jobs.push(newJob) //Proximamente en una base de datos

    return res.status(201).json(newJob)
})

app.delete('/jobs:id', (req, reqs)=>{

})
