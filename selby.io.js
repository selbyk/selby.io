// Setup basic express server
var express = require('express');
var app = express();
var compress = require('compression');
app.use(compress());
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

//connection.connect();

var sql = "INSERT INTO `message` (`time`, `to`, `from`, `message`) VALUES ?";
var channels = []
var messages = []

// Start the server
server.listen(port, function () {
console.log('Server listening at port %d', port);
});

// Routing


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// a convenient variable to refer to the HTML directory
var html_dir = './html/';

// routes to serve the static HTML files
app.get('/socket.io.min.js', function(req, res) {
    res.sendfile('./bower_components/socket.io-client/socket.io.min.js');
});

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

io.on('connection', function (socket) {

  var addedUser = false;
  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    client.say('#sentiment', socket.username + "=> " + data);
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

  client.addListener('message', function (from, to, message) {
    //var ircMessage = [Date.now(), to, from, message];
    //messages.push(ircMessage);
    console.log(to + ' => ' + from + ': ' + message);
    //if(to === '#sentiment')
      socket.broadcast.emit('new message', {
        username: from,
        message: message
      });
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

  client.addListener('join', function(channel, who) {
    socket.emit('add user', who);
    console.log('%s has joined %s', who, channel);
  });

  client.addListener('part', function(channel, who, reason) {
    socket.broadcast.emit('user left', {
      username: who,
      numUsers: numUsers
    });
    console.log('%s has left %s: %s', who, channel, reason);
  });

  client.addListener('kick', function(channel, who, by, reason) {
    socket.broadcast.emit('user left', {
      username: who,
      numUsers: numUsers
    });
    console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
  });
});

setTimeout(function () { client.say("NickServ", "identify fmlsummmer2") }, 30000);




client.addListener('error', function(message) {
  console.error('ERROR: %s: %s', message.command, message.args.join(' '));
  connection.query("INSERT INTO `error` (`time`, `command`, `args`) VALUES ?", [[[Date.now(), message.command, message.args.join(' ')]]], function(err) {
    if (err) throw err;
  });
});



client.addListener('pm', function(nick, message) {
  console.log('Got private message from %s: %s', nick, message);
  client.say(nick, 'you told me' + message);
});
