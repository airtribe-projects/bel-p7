const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const { newUser, formatMessage, getIndividualRoomUsers, getActiveUser, exitRoom } = require('./helper/helper');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user = newUser(socket.id, username, room);
        console.log("Created the new user");

        socket.join(user.room);

        socket.emit('message', formatMessage("Airtribe", "Messages are limited to this room !"));

        socket.broadcast.to(user.room).emit('message', formatMessage("Airtribe", `${username} has joined the room`));

        io.to(user.room).emit('onlineUsers', {
            room: user.room,
            users: getIndividualRoomUsers(user.room)
        });

    });

    socket.on('chatMessage', msg => {
        const user = getActiveUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    }); 

    socket.on('disconnect', () => {
        const user = exitRoom(socket.id);
        console.log(user);

        io.to(user.room).emit('message', formatMessage("Airtirbe", `${user.username} has left the room!`));

        io.to(user.room).emit('onlineUsers', {
            room: user.room,
            users: getIndividualRoomUsers(user.room)
        });

    }); 
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Server is running');
})