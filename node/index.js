import os from "node:os"
console.log("Sistema operativo:", os.type())
console.log("Arquitectura:", os.arch())
console.log("Memoria total:", os.totalmem())
console.log("Memoria libre:", os.freemem())