import express from 'express'
import jobs from './jobs.json' with { type: 'json' }
import { DEFAULTS } from './config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

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

    return res.json(paginatedJobs)
})

app.get('/jobs/:id', (req, res)=>{
    const { id } = req.params

    const job = jobs.find()
    return res.json({
        job: {id, title: `Job with id: ${id}`}
    })
})

app.put('/jobs:id', (req,res)=>{

})

app.patch('/jobs:id', (req,res)=>{

})

app.post('/jobs:id', (req,res)=>{

})

app.delete('/jobs:id', (req, reqs)=>{

})
app.listen(PORT, () =>{
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})