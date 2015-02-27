var os = require('os'),
    moment = require('moment')
/*os.tmpdir()
os.endianness()
os.hostname()
os.type()
os.()
os.arch()
os.release()
os.()
os.()
os.()
os.()
os.()
os.networkInterfaces()
os.EOL*/

module.exports = function(app, db) {
  app.get('/api/stats', function(req, res) {
    res.send({
      "stats": {
        type: os.type(),
        arch: os.arch(),
        platform: os.platform(),
        release: os.release(),
        uptime: moment.duration(os.uptime(), 'seconds').humanize(),
        loadavg: os.loadavg().map(function(load){return load.toFixed(2)}),
        loadpercent: (os.loadavg()[0]*100/os.cpus().length).toFixed(2),
        totalmem: os.totalmem(),
        freemem: os.freemem(),
        mempercent: ((os.freemem()/os.totalmem())*100).toFixed(2),
        cpus: os.cpus()
      }
    })
  })
}
