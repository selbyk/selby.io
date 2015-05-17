
var express = require('express');
var cors = require('cors');
var compress = require('compression');
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var globSync = require('glob').sync;
var db = require('./models'); // Sequelize!
var routes = globSync('./routes/**/*.js', {
  cwd: __dirname
}).map(require);
var busboy = require('connect-busboy'); //middleware for form/file upload

var config = {
  sequelizeJsonApi: {
    endpoint: '/api/v1', // needed for href calculation
  }
};

// Setup server
module.exports = function(app) {
  // sync db
  db.sequelize.sync();
  // setup express
  app.use(compress())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ // to support URL-encoded bodies
      extended: true
    }))
    .use(busboy())
    .use(cors({
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
  // setup the routes
  routes.forEach(function(route) {
    route(app, db);
  });
  return app;
};
