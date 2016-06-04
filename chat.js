var socket = io();
var messages=[];
var me="";
function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message);
}
$('#m').val('').focus();
  return false;
}

function notifyTyping() {
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}

socket.on('chatMessage', function(from, msg,allmsg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
messages=allmsg;
messages.push({from:from,msg:msg});
/*
messages.push('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
*/
  document.getElementById('messages').innerHTML=("Has <br>");
for(var i=0;i<messages.length-1;i++){
if(allmsg[i].from===me){
 var color = 'green';
$('#messages').append('<li><b style="color:' + color + '">Me</b>: ' +allmsg[i].msg +'</li>');
}else{
 var color =  '#009afd';
$('#messages').append('<li><b style="color:' + color + '">' + allmsg[i].from + '</b>: ' +allmsg[i].msg +'</li>');
}
}
});

socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user == me)
     {
    $('#notifyUser').text( 'Me typing ...');
     }
  else if(user != me)
   {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});

$(document).ready(function(){
  var name = makeid();
 me=name;
  $('#user').val(name);
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
});

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}