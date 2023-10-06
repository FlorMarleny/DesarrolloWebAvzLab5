const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

const path = require('path');

// ...
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'inicio.html'));
});

app.get('/nosotros', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'nosotros.html'));
});

app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'productos.html'));
});

app.get('/galeria', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'galeria.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});

  
io.on('connection', (socket) => {
  console.log('Alguien se conectó!');

  socket.on('chat message', (mensaje) => {
    console.log('Recibí: ' + mensaje);
    io.emit('recibido', {
      date: new Date(),
      txt: mensaje
    });
  });
});

server.listen(port, () => {
  console.log('Escucha en http://localhost:' + port);
});


// const express = require('express');
// const app = express();

// app.use(express.static('public'))
// app.use(express.static('files'))
// app.use('/static',express.static('public'))
// app.get('/',function(req,res){
//     res.sendFile('Hola mundo! en Express.)')
// });
// app.post('/',function(req,res){
//     res.send('Llamamos POST misma url')
// })
// app.put('/user',function(req,res){
//     res.send('Recibimos un PUT en /user')
// })

// app.delete('/user', function(req,res){
//     res.send('RRecibimos un DELETE en /user ')
// })

// app.listen(3000,function(){
//     console.log('Aplicacion de ejemplo escucharndo el puerto 3000!')
// });

// app.use(function (req, res, next) {
//      res.status(404).send("Eso no existe!") 
// })
// app.use(function (req, res, next) {
//     console.error(err.stack)
//     res.status(500).send("Algo salio mal!") 
// })