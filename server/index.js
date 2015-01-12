module.exports = function(app){
// Setup basic express server
var express = require('express');
var compress = require('compression');

var port = process.env.PORT || 8282;
var sys = require('sys');
var exec = require('child_process').exec;
//var irc = require('irc');
//var mysql      = require('mysql');

var bodyParser = require('body-parser');
var globSync   = require('glob').sync;
var http = require('http'), // node's http system
  db = require('./models'); // Sequelize!
//var routes     = globSync('./routes/*.js', { cwd: __dirname }).map(require);

var config = {
  sequelizeJsonApi: {
    endpoint: '/api', // needed for href calculation
  }
};

/**
 * Generates API routes for all of the ./models that are allowed in config var
 *
 * @method generateApiRoutes
 * @param {Json} sequelizeJsonApiConfig
 * @return void
 */
var generateApiRoutes = function(sequelizeJsonApiConfig){
  // Configure the api
  var apiRoutes = api = require('sequelize-json-api'); // api mod
  apiRoutes = api(db.sequelize, sequelizeJsonApiConfig);
  //Generate routes for models in config
  apiRoutes.initialize();
  return apiRoutes;
}

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
  expressApp.use( cors() ); // cors enables cross site scripting
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
var setupRouting = function(expressApp, apiRoutes){
  // Use api routes
  expressApp.use('/api/v1', apiRoutes);
  //expressApp.use('/docs', express.static(__dirname + '/public/docs'));
  // don't throw a 404, just send index.html.  ususally a good idea.
  /*expressApp.get('*', function(request, response){
    response.sendFile(__dirname + '/dist/index.html');
  });*/
  return expressApp;
};

// Routing

app = setupExpress(app);

app.get('/api', function (req, res) {
  res.send('Hello World!')
});

apiRoutes = generateApiRoutes(config.sequelizeJsonApi);

app = setupRouting(app, apiRoutes);

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

//app.use("/", express.static(__dirname + '/dist'));

// Sync the database and start start listening so we can respond to requests
  db.sequelize.sync().complete(function(err) {
    if (err) {
      throw err[0];
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });

return app;

}

/**
 * Runs lsu-scheduler by setting up express, building api routes, and seting up
 * the database to start serving LSU Scheduler and all it's goodness
 *
 * @method run
 * @return void
 */
 /*module.exports = function(app) {
   app = setupExpress(app);

   var apiRoutes = generateApiRoutes(config.sequelizeJsonApi);
   app = setupRouting(app, apiRoutes);

  app.post('/api/v2/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true })
  );

  app.get('/api/v2/users', function (req, res) {
    db.user.findAll({ limit: 25 }).success(function(users) {
      res.send({'users': users});
    })
  });

  app.get('/api/v2/users/:id', function(req, res){
    db.user.find(req.params.id).success(function(user) {
      res.send({'users': user});
    })
});

  app.get('/api', function (req, res) {
      res.send('Hello World!')
    });

  app.get('/api/v2/items', function (req, res) {
    var album_ids = [], photo_ids = [], color_ids = [];

    var response = {
      items: [],
      albums: [],
      photos: []
    };

    // Quick example
    db.sequelize.query("SELECT * FROM item LIMIT 20").success(function(items) {
      response.items = items;
      response.items.forEach(function(item){
        album_ids.push(item.album_id);
        color_ids.push(item.color_one_id);
        color_ids.push(item.color_two_id);
        color_ids.push(item.color_three_id);
        item.tags = [];
        response.items.push(item)
      })
      db.sequelize.query("SELECT * FROM photo_album WHERE photo_album.id IN ("+album_ids.join()+")").success(function(albums) {
        response.albums = albums;
        db.sequelize.query("SELECT * FROM photo WHERE photo.album_id IN ("+album_ids.join()+")").success(function(photos) {
          response.photos = photos;
          db.sequelize.query("SELECT * FROM color WHERE color.id IN ("+color_ids.join()+")").success(function(photos) {
            response.photos = photos;
            res.send(response);
          })
        })
      })
    })
  });

  app.get('/api/search', function(req, res){
    client.ping({
      // ping usually has a 100ms timeout
      requestTimeout: 1000,

      // undocumented params are appended to the query string
      hello: "elasticsearch!"
    }, function (error) {
      if (error) {
        res.send('elasticsearch cluster is down!');
      } else {
        res.send('All is well');
      }
    });
  });

  app.get('/api/search/items', function(req, res){
    var size = req.param('size', 25);
    var page = req.param('page', 0);
    var queryString = req.param('q', '');

    // avoid page numbers to be trolled i.e.: page=string, page=-1, page=1.23
    page = isNaN(page) ? 1 : Math.floor(Math.abs(page));

    var elasticSearchQuery = {
      "index": 'sparehanger',
      "type": 'items',
      'from': page*size,
      'size': size
      //'fields' : ['id']
      //"query": {
      //  "query_string": {
      //      "query": 'shirt'//queryString,
            //"analyzer": "snowball",
            //"fields": ["_all"],
            //"default_operator": "and"
      //  }
      //}
    };

    if(queryString != ''){
      elasticSearchQuery.q = queryString;
    }

    client.search(elasticSearchQuery).then(function (resp) {
        var ids = [];
        resp.hits.hits.forEach(function(hit){
          ids.push(hit._source.id);
        });
        res.send(ids);
    }, function (err) {
        console.trace(err.message);
    });
  });



  // Sync the database and start start listening so we can respond to requests
  db.sequelize.sync().complete(function(err) {
    if (err) {
      throw err[0];
    } else {
      //http.createServer(app).listen(app.get('port'), function(){
      //  console.log('Express server listening on port ' + app.get('port'));
      //});
    }
  });

   return app;
}*/



/*var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

var elasticsearch = require('elasticsearch');

var config = {
  sequelizeJsonApi: {
    endpoint: '/api', // needed for href calculation
  }
};

var client = new elasticsearch.Client({
  host: 'sparehanger.dev:9200',
  log: 'trace'
});
*/
