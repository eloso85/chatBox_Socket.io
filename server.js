const path = require('path');
const http = require('http');
const express = require('express');
const formatMessage = require('./utils/messages')
const {userJoin, getCurrentUser, userLeave,getRoomUser} = require('./utils/users')


const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server);
//Set static folder

app.use(express.static(path.join(__dirname, 'public')))

const botName = 'ChatCord Bot'

//run when client connects

io.on("connection", socket =>{
   socket.on('joinRoom',({username, room})=>{

      const user =userJoin(socket.id, username,room)

      socket.join(user.room)
      //welcome current user.
   socket.emit('message', formatMessage(botName,'welcome to chatcord'));//this replaces (username, text ) from messages.js

   //broadcast when user connects
   socket.broadcast
   .to(user.room)
   .emit(
      'message',
       formatMessage(botName, `${user.username} has joined the chat`)
       );
       //set user and room info 
       io
       .to(user.room)
       .emit('roomUsers',{
          room: user.room,
          users: getRoomUser(user.room)
       })
   })

  
//hello
   //listen for chat message
   socket.on('chatMessage', msg=>{
      const user = getCurrentUser(socket.id)

      io.to(user.room).emit('message', formatMessage(user.username,msg));//io emits to everything
   })
    //when client disconnects
    socket.on('disconnect',()=>{
       const user = userLeave(socket.id)

     if(user){
      io.to(user.room).emit('message', formatMessage(botName,`${user.username} has left the chat`));

      io
       .to(user.room)
       .emit('roomUsers',{
          room: user.room,
          users: getRoomUser(user.room)
       })
     }
     

   })
})

const PORT =  process.env.PORT || 3000;
//const PORT = 3000 || process.env.PORT;


server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))