import express from 'express'

const PORT = process.env.PORT ?? 1234
const app = express()

app.use((request, response, next)=>{
    const timeString = new Date().toLocaleDateString()
    console.log(`[${timeString}] ${request.method} ${request.url}`)
    next()
})
app.get('/',(request, response)=>{
    response.send('Hello World')
})
app.get('/health',(request,response)=>{
    return response.json({
        status: 'ok',
        uptime: process.uptime()
    })
})

app.listen(PORT, () =>{
    console.log(`Servidos levantado en http://localhost:${PORT}`)
})