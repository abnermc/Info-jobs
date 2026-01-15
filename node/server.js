import {json} from 'node:stream/consumers'
import {createServer} from 'node:http'
import { randomUUID } from 'node:crypto'

const users = [
    {id:1, name: 'abner'},
    {id:2, name: 'luquitas'},
    {id:3, name: 'benja'},
    {id:4, name: 'satoru'},
    {id:5, name: 'seba'}
]
const port = process.env.PORT ?? 3000
function sendJson(res, statusCode, data){
    res.statusCode = statusCode
    res.setHeader('Content-Type','application/json; charset=utf-8')
    res.end(JSON.stringify(data))
}
const server = createServer(async (req, res)=>{
    const {method, url} = req
    const [pathname, queryString] = url.split('?')
    const searchParams = new URLSearchParams(queryString)

    console.log(searchParams.get('limit'))
    if(method === 'GET'){
        if(pathname === '/users') {
            const limit = Number(searchParams.get('limit')) || users.length
            const offset = Number(searchParams.get('offset')) || 0
            const paginatedUsers = users.slice(offset, offset + limit)

            return sendJson(res, 200, paginatedUsers)
        }
        if(pathname === '/health'){
            return sendJson(res,200,{status: 'ok',uptime: process.uptime() })
        }
    }
    if(method === 'POST'){
        if(pathname === '/users'){
            const body = await json(req)
            if(!body || !body.name) return sendJson(res,400,{error:'Name is required'})
            const newUser = {
                name: body.name,
                id: randomUUID()
            }
            users.push(newUser)
            return sendJson(res, 201, {message: 'Usuario creado'})
        }
    }
    return sendJson(res, 404, { error: 'Not Found' }) 
})

server.listen(port, ()=>{
    const address = server.address()
    console.log(`Servidor escuchando en http://localhost:${address.port}`)
})