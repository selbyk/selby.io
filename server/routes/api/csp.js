module.exports = function(app, db) {
  app.post('/api/csp', function(req, res) {
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body["csp-report"]));
    res.send("thanks!");
  });
};
