// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var sys = require('sys');
var exec = require('child_process').exec;
var irc = require('irc');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'sentiment',
  password : 'SentimentalSentiment42',
  database: 'freenode'
});

connection.connect();

var sql = "INSERT INTO `message` (`time`, `to`, `from`, `message`) VALUES ?";
var channels = []
var messages = []

server.listen(port, function () {
console.log('Server listening at port %d', port);
});



var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.get('/deploy', function(req, res) {
    var body = 'Deployed';
    function puts(error, stdout, stderr) { res.send(body + '\n' + stdout); }
    exec("git pull && npm install && bower install && ember build && forever restart selby.io.js", puts);

});
app.post('/deploy', function(req, res) {
    var body = 'Deployed';
    function puts(error, stdout, stderr) { res.send(body + '\n' + stdout); }
    exec("git pull && npm install && bower install && ember build && forever restart selby.io.js", puts);

});
// Routing
app.use(express.static(__dirname + '/dist'));
// Chatroom
// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

var client = new irc.Client('chat.freenode.net', 'sentiment', {
  debug: true,
  autoRejoin: false,
  floodProtection: true,
  floodProtectionDelay: 1000,
  userName: 'selby',
  realName: 'Selby Kendrick',
  channels: ['#sentiment', '#lsucompsci']
});

client.addListener('message', function (from, to, message) {
  var ircMessage = [Date.now(), to, from, message];
  messages.push(ircMessage);
  console.log(to + ' => ' + from + ': ' + message);
});

client.addListener('error', function(message) {
  console.error('ERROR: %s: %s', message.command, message.args.join(' '));
  connection.query("INSERT INTO `error` (`time`, `command`, `args`) VALUES ?", [[[Date.now(), message.command, message.args.join(' '$
    if (err) throw err;
  });
});

client.addListener('message', function (from, to, message) {
  console.log('%s => %s: %s', from, to, message);
  if ( to.match(/^[#&]/) ) { // channel message
    if ( message.match(/hello/i) ) {
      client.say(to, 'Hello there ' + from);
    }
    if ( message.match(/dance/) ) {
      setTimeout(function () { client.say(to, "\u0001ACTION dances: :D\\-<\u0001") }, 1000);
      setTimeout(function () { client.say(to, "\u0001ACTION dances: :D|-<\u0001") }, 2000);
      setTimeout(function () { client.say(to, "\u0001ACTION dances: :D/-<\u0001") }, 3000);
      setTimeout(function () { client.say(to, "\u0001ACTION dances: :D|-<\u0001") }, 4000);
    }
  }
  else { // private message
  }
});

client.addListener('pm', function(nick, message) {
  console.log('Got private message from %s: %s', nick, message);
  client.say(nick, 'you told me' + message);
});

client.addListener('join', function(channel, who) {
  console.log('%s has joined %s', who, channel);
});

client.addListener('part', function(channel, who, reason) {
  console.log('%s has left %s: %s', who, channel, reason);
});

client.addListener('kick', function(channel, who, by, reason) {
  console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
});

setTimeout(function(){
  client.say('selby', 'hey selby');
}, 30000);


io.on('connection', function (socket) {
  var addedUser = false;
  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });
  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });
  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });
  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
