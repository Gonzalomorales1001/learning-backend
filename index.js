// const express = require('express') //importamos express
// const app = express() //aqui esta todo el contenido de la libreria express (metodos y algunas func)

// app.get('/', function (req, res) {
//   res.send('HOLA MUNDO')
// })

// app.listen(3000)

const Server=require('./models/server')

const server= new Server()

server.listen()