var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function(req, res) {
  res.sendFile(__dirname + '/chat.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  // console.log('an user connected');
  const username = socket.handshake.query.username,
    room = socket.handshake.query.room ? socket.handshake.query.room : 'holaCirce';

  socket.join(room);

  // send message to other connected users
  socket.to(room).emit('chat message', username + ' connected');

  // send message to user that conected
  setTimeout(function() {
    socket.send('Welcome ' + username);
  }, 500);
  
  socket.on('chat message', function(msg) {
    socket.to(room).emit('chat message', msg);
  });

  socket.on('disconnect', function() {
  //   console.log('user disconnected');
  // send message to other connected users
  socket.to(room).emit('chat message', username + ' left');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
