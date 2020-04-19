const chatForm = document.getElementById('chat-form')
const chatMessages =document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users');



const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})// Added Qs cdn to chathtml in under script. 

console.log(username, room)

const socket = io();

//Join chat room
socket.emit('joinRoom',{username, room})

//get room and user

socket.on('roomUsers', ({room, users})=>{
    outputRoomName(room);
    outputUsers(users);

})

//message from server
socket.on('message', message=>{
    console.log(message)

    outputMessage(message)
    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message submit
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const msg = e.target.elements.msg.value //this grabs the msg Id from chat.html and usese value

    socket.emit('chatMessage',msg) //chatMessage is the payload saved from const msg

    e.target.elements.msg.value='';//clears input after message input
    e.target.elements.msg.focus();//foucs on empy input


})

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// add room name to dom

function outputRoomName(room){
    roomName.innerText = room;
}

//add users name to dom 

function outputUsers(users){
    usersList.innerHTML = `
    ${users.map(user =>`<li>${user.username}</li>`).join('')}
    `
}