fs = require('fs');

module.exports = function(app, db) {
  app.get('/api', function (req, res) {
    res.send('Hello World!')
  });
};
