const chatForm = document.getElementById('chat-form')

const socket = io();
//message from server
socket.on('message', message=>{
    console.log(message)

    outputMessage(message)
})

//Message submit
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const msg = e.target.elements.msg.value //this grabs the msg Id from chat.html and usese value

    socket.emit('chatMessage',msg) //chatMessage is the payload saved from const msg
})

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}