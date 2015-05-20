fs = require('fs');

module.exports = function(app, db) {
  app.post('/api/token', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.grant_type === 'password') {
      if (req.body.username === 'selby' && req.body.password === 'f2b939e5470e8bf0916de580fcdcda4e2ae4885c290651e735a82c651b8a3104') {
        res.send({ access_token: process.env.AWS_ACCESS_KEY_ID });
      } else {
        res.status(400).send({ error: 'invalid_grant' });
      }
    } else {
      res.stauts(400).send({ error: 'unsupported_grant_type' });
    }
  });

  app.post('/api/revoke', function(req, res) {
    if (req.body.token_type_hint === 'access_token' || req.body.token_type_hint === 'refresh_token') {
      res.send('');
    } else {
      res.stauts(400).send({ error: 'unsupported_token_type' });
    }
  })
};
