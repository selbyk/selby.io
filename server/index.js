module.exports = function(app){
// Setup basic express server
var express = require('express');
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

app.get('/deploy', function(req, res) {
    var body = 'Deployed';
    function puts(error, stdout, stderr) { res.send(body + '\n' + stdout); }
    exec("git pull && npm install && bower install && killall ember && ember s", puts);

});

app.post('/deploy', function(req, res) {
    var body = 'Deployed';
    function puts(error, stdout, stderr) { res.send(body + '\n' + stdout); }
    exec("git pull && npm install && bower install && ember build --environment=production && forever restart selby.io.js", puts);

});

return app;

}
