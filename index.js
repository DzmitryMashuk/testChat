const express = require('express');
const app     = express();
const server  = require('http').createServer(app);
const io      = require('socket.io').listen(server);
const path    = require('path');

server.listen(3000);

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let connections = [];

io.sockets.on('connection', (socket) => {
    connections.push(socket);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('send', (data) => {
        io.sockets.emit('addMessage', {user: data.user, message: data.message, color: data.color});
    });
});
