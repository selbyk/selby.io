module.exports = function(app, db) {
  app.get('/api/deploy', function(req, res) {
      var body = 'Deployed';
      function puts(error, stdout, stderr) {
        res.send(body + '\n' + stdout);
      }
      exec("git pull && npm install --save-dev && bower install --save && ./run.sh", puts);
  });

  app.post('/api/admin/deploy', function(req, res) {
      var body = 'Deployed';
      function puts(error, stdout, stderr) {
        res.send(body + '\n' + stdout);
      }
      exec("git pull && npm install --save-dev && bower install --save && ./run.sh", puts);
  });
};
