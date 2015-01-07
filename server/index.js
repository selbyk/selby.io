module.exports = function(app){
// Setup basic express server
var express = require('express');
var compress = require('compression');

var port = process.env.PORT || 8282;
var sys = require('sys');
var exec = require('child_process').exec;
var irc = require('irc');
var mysql      = require('mysql');

// Routing

app.use(compress());

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

app.use("/", express.static(__dirname + '/dist'));

return app;

}
