const express = require('express') //importamos express
const cors = require('cors')

class Server{
    constructor(){
        this.app=express()
        this.usersPath="/api/users"
        this.port=process.env.PORT
        
        //crear los middlewares para el servidor
        this.middlewares()

        //llamando las rutas en el constructor para q cuando levante el server se carguen las rutas
        this.routes()
    }
    middlewares(){
        //CORS
        this.app.use(cors())
        //leer lo que envia el usuario por el cuerpo de la peticion
        this.app.use(express.json())
        //definir la carpeta public (los archivos estáticos)
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use(this.usersPath, require("../routes/users"))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server Started (port ${this.port})`)
        })
    }
}

module.exports=Server