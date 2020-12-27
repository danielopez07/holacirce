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

  // send message to other connected users
  socket.broadcast.emit('chat message', socket.handshake.query.username + ' connected');

  // send message to user that conected
  setTimeout(function() {
    socket.send('Welcome ' + socket.handshake.query.username);
  }, 500);
  
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
  //   console.log('user disconnected');
  // send message to other connected users
  socket.broadcast.emit('chat message', socket.handshake.query.username + ' left');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
