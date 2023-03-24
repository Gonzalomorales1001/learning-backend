const express = require('express') //importamos express
const cors = require('cors')
const {DBconnection}=require('../database/config')

class Server{
    constructor(){
        this.app=express()
        //definimos el puerto para posteriormente levantar el servidor
        this.port=process.env.PORT
        //definimos las rutas del servidor
        this.authPath="/api/auth"
        this.usersPath="/api/users"
        this.categoriesPath="/api/categories"
        this.coursesPath="/api/courses"
        this.searchPath='/api/search'
        //conectar con base de datos
        this.connectDB()

        //crear los middlewares para el servidor
        this.middlewares()

        //llamando las rutas en el constructor para q cuando levante el server se carguen las rutas
        this.routes()
    }
    async connectDB(){
        await DBconnection()
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
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.categoriesPath, require('../routes/categories'))
        this.app.use(this.coursesPath, require('../routes/courses'))
        this.app.use(this.searchPath, require('../routes/search'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server Started (port ${this.port})`)
        })
    }
}

module.exports=Server