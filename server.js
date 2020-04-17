const path = require('path');
const http = require('http');
const express = require('express');
const formatMessage = require('./utils/messages')

const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server);
//Set static folder

app.use(express.static(path.join(__dirname, 'public')))

const botName = 'ChatCord Bot'

//run when client connects

io.on("connection", socket =>{
   
//welcome current user.
   socket.emit('message', formatMessage(botName,'welcome to chatcord'));//this replaces (username, text ) from messages.js

   //broadcast when user connects
   socket.broadcast.emit('message', formatMessage(botName, 'User has joined the chat'));
   //when client disconnects
   socket.on('disconnect',()=>{
      io.emit('message', formatMessage(botName,'A user has left the chat'));
   })

   //listen for chat message
   socket.on('chatMessage', msg=>{
      io.emit('message', formatMessage('USER',msg));//io emits to everything
   })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))