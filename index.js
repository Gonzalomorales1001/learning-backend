const Server=require('./models/server')
require('dotenv').config()

const server= new Server()

server.listen()







// //estructura básica de un servidor

// const express = require('express') //importamos express
// const app = express() //aqui esta todo el contenido de la libreria express (metodos y algunas func)

// app.get('/', function (req, res) {
//   res.send('HOLA MUNDO')
// })  //nuestra primera ruta con el controlador 'get'

// app.listen(3000) //levantamos el servidor