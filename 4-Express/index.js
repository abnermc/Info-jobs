import express from 'express'

const PORT = process.env.PORT ?? 1234
const app = express()

app.get('/',(request, response)=>{
    response.send('Hello World')
})

app.listen(PORT, () =>{
    console.log(`Servidos levantado en http://localhost:${PORT}`)
})