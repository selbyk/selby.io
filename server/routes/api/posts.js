module.exports = function(app, db) {

  app.get('/api/posts', function(req, res) {
    var auth_level = 0;
    if (req.headers.authorization) {
      var regex_match = req.headers.authorization.match(/Bearer (.*)/);
      //console.log(regex_match[1])
      //console.log(regex_match.length)
      //if(regex_match && regex_match.length == 2)
      //console.log(regex_match[1])
      //else
      //console.log('THERE IS NO KEY')

      if (regex_match[1] == process.env.AWS_ACCESS_KEY_ID) {
        console.log('authenticated request');
        auth_level = 9001;
      }
    }
    //console.log(process.env.AWS_ACCESS_KEY_ID)

    var send = function(posts) {
      res.send({
        "posts": posts
      });
    };

    switch (auth_level) {
      case 9001:
        db.post.findAll({
          limit: 50
        }).then(function(posts) {
          send(posts);
        });
        break;
      default:
        db.post.findAll({
          where: {
            private: false
          },
          order: [
            ['created_at', 'DESC']
          ]
        }).then(function(posts) {
          send(posts);
        });
    }
  });

  app.get('/api/posts/:post_id', function(req, res) {
    var auth_level = 0;
    if (req.headers.authorization) {
      var regex_match = req.headers.authorization.match(/Bearer (.*)/);
      //console.log(regex_match[1])
      //console.log(regex_match.length)
      //if(regex_match && regex_match.length == 2)
      //console.log(regex_match[1])
      //else
      //console.log('THERE IS NO KEY')

      if (regex_match[1] == process.env.AWS_ACCESS_KEY_ID) {
        console.log('authenticated request');
        auth_level = 9001;
      }
    }
    //console.log(process.env.AWS_ACCESS_KEY_ID)

    var send = function(posts) {
      res.send({
        "post": posts
      })
    }

    switch (auth_level) {
      case 9001:
        db.post.find({
          where: {
            id: req.params.post_id
          }
        }).then(function(post) {
          send(post);
        })
        break;
      default:
        db.post.findAll({
          where: {
            private: false
          }
        }).then(function(posts) {
          send(posts);
        })
    }
  });

  app.post('/api/posts', function(req, res) {
    var auth_level = 0;
    if (req.headers.authorization) {
      var regex_match = req.headers.authorization.match(/Bearer (.*)/)
        //console.log(regex_match[1])
        //console.log(regex_match.length)
        //if(regex_match && regex_match.length == 2)
        //console.log(regex_match[1])
        //else
        //console.log('THERE IS NO KEY')

      if (regex_match[1] == process.env.AWS_ACCESS_KEY_ID) {
        console.log('authenticated request');
        auth_level = 9001;
      }
    }
    //console.log(process.env.AWS_ACCESS_KEY_ID)

    function send(posts) {
      res.send({
        "posts": posts
      });
    }

    switch (auth_level) {
      case 9001:
        db.post.create(req.body.post).then(function(posts) {
          send(posts);
        });
        break;
      default:
        db.post.findAll({
          where: {
            private: false
          }
        }).then(function(posts) {
          send(posts);
        });
    }
  });

  app.put('/api/posts/:post_id([0-9]+)', function(req, res) {
    var auth_level = 0;
    if (req.headers.authorization) {
      var regex_match = req.headers.authorization.match(/Bearer (.*)/);

      if (regex_match[1] == process.env.AWS_ACCESS_KEY_ID) {
        console.log('authenticated request');
        auth_level = 9001;
      }
    }

    function send(posts) {
      res.send({
        "posts": posts
      });
    }

    switch (auth_level) {
      case 9001:
      db.post.find({id:req.params.post_id})
      .then(function(post) {
        post
        .updateAttributes(req.body.post)
        .then(function(post) {
          res.send({
            "post": post
          });
        })
        .catch(function(err) {
          res.send({
            "error": err.message || err
          });
        });
      })
      .catch(function(err) {
        res.send({
          "error": err.message || err
        });
      });
        break;
      default:
        db.post.findAll({
          where: {
            private: false
          }
        }).then(function(posts) {
          send(posts);
        });
    }
  });
};
