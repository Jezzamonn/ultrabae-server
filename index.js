var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });
app.use(express.static('baedar'));

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('unity connect', function(username) {
  	// Join a room with that username. I think that's all that's needed?
  	socket.join(username);
    console.log('unity joining room ' + username);
  });
  socket.on('phone connect', function(username) {
  	// Ditto.
  	socket.join(username);
    console.log('phone joining room ' + username);
  });

  socket.on('set stat', function(msg){
  	for (var room in socket.rooms) {
  		io.to(room).emit('set stat', msg);
  	}
    console.log(msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});