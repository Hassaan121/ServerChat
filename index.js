
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var messages=[];

// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Register events on socket connection
io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg,allmsg){
messages.push({from:from,msg:msg});
    io.emit('chatMessage', from, msg,messages);
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});

// Listen application request on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000 \n');
});


