//Ejemplo de creación del primer CLI
import { readdir, stat } from 'node:fs/promises'
import {join} from 'node:path'

// 1. Recuperar carpeta a listar
const dir = process.argv[2] ?? '.'
//console.log('Arguments:', args)

// 2. Formateo simple de tamaños
const formatBytes = (size) => {
    if(size < 1024) return `${size} B`
    return `${(size/1024).toFixed(2)} KB`
}

// 3. Leer los nombres sin la info
const files = await readdir(dir)
console.log(files)

// 4. Recuperar info de cada file
const entries = await Promise.all(
    files.map(async (name)=>{
        const fullPath = join(dir, name)
        const info = await stat(fullPath)

        return{
            name,
            isDir: info.isDirectory(),
            size: formatBytes(info.size)
        }
    })
)

for (const entry of entries){
    const icon = entry.isDir ? '📁' : '📇'
    const size = entry.isDir ? '-' : `${entry.size}`
    console.log(`${icon} ${entry.name.padEnd(20)} ${size}`)
}