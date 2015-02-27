module.exports = function(app){
// Setup basic express server
var express = require('express');
var compress = require('compression');

var port = process.env.PORT || 8282;
var sys = require('sys');
var exec = require('child_process').exec;
//var irc = require('irc');
//var mysql      = require('mysql');
passport = require("passport");
LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var globSync   = require('glob').sync;
var http = require('http'), // node's http system
  db = require('./models'); // Sequelize!
//var routes     = globSync('./routes/*.js', { cwd: __dirname }).map(require);
var routes = globSync('./routes/**/*.js', { cwd: __dirname }).map(require);
var busboy = require('connect-busboy'); //middleware for form/file upload

var config = {
  sequelizeJsonApi: {
    endpoint: '/api/v1', // needed for href calculation
  }
};

/**
 * Configure Express server to use Heroku port or 5000, use gzip compression, automatgickly
 * parse json requests to get  js object, and accept url-encodingsds
 *
 * @method setupExpress
 * @param {Object} express
 * @return void
 */
var setupExpress = function(expressApp){
  var compress = require('compression'), // this compresses stuff
      bodyParser = require('body-parser'), // So we can parse the various formats we will recieve
      cors = require('cors');
  // Configure express
  // expressApp.set('port', (process.env.PORT || 5000)); // Port to use, process.env.PORT is set by heroku
  expressApp.use(compress()); // Tells Express to use gzip encryption
  expressApp.use( bodyParser.json() ); // JSON-encoded body support
  expressApp.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));
  expressApp.use(busboy());
  expressApp.use( cors({allowedHeaders: ['Content-Type', 'Authorization']}));
  return expressApp;
}

/**
 * Tell express how to serve routes for /, /docs, and serve a restful api interface
 * of all the models configured in ./models
 *
 * @method setupRouting
 * @param {Object} express
 * @return void
 */
var setupRouting = function(expressApp){
  // Configure the api
  //var apiRoutes = api = require('sequelize-json-api'); // api mod
  //apiRoutes = api(db.sequelize, config.sequelizeJsonApiConfig);
  //Generate routes for models in config
  //apiRoutes.initialize();
  // Use api routes
  //expressApp.use('/api/v1', apiRoutes);

  routes.forEach(function(route) { route(expressApp, db); });
  //expressApp.use('/docs', express.static(__dirname + '/public/docs'));
  // don't throw a 404, just send index.html.  ususally a good idea.
  /*expressApp.get('*', function(request, response){
    response.sendFile(__dirname + '/dist/index.html');
  });*/
  return expressApp;
};

// Configure Express
app = setupExpress(app);

// Routing
app = setupRouting(app);

//app.use("/", express.static(__dirname + '/dist'));

// Sync the database and start start listening so we can respond to requests
db.sequelize.sync();

return app;

}
