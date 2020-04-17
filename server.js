const path = require('path');
const http = require('http');
const express = require('express');

const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server);
//Set static folder

app.use(express.static(path.join(__dirname, 'public')))

//run when client connects

io.on("connection", socket =>{
   
//welcome current user.
   socket.emit('message', 'welcome to chatcord');

   //broadcast when user connects
   socket.broadcast.emit('message', 'User has joined the chat');
   //when client disconnects
   socket.on('disconnect',()=>{
      io.emit('message', 'A user has left the chat');
   })

   //listen for chat message
   socket.on('chatMessage', msg=>{
      io.emit('message', msg);//io emits to everything
   })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))