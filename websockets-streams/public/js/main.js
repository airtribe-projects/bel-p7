const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const leave = document.getElementById('leave-btn');

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});

console.log(username);
console.log(room);

const socket = io();

socket.emit('joinRoom', {username, room});

socket.on('message', (message)=> {
    outputMessage(message);
});

socket.on('onlineUsers', ({room, users}) => {
    outputUsers(users);
    outputRoomName(room);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let message = e.target.elements.msg.value
    socket.emit('chatMessage', message);
});


leave.addEventListener('click', () => {
    window.location = '../index.html';
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
  
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
  
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
  
    document.querySelector('.chat-messages').appendChild(div);
}
  
function outputRoomName(room) {
    roomName.innerText = room;
}
  
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
    });
}