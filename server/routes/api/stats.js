'use strict';
const os = require('os');
const spawn = require('child_process').spawn;
const moment = require('moment');
const cpuStats = require('cpu-stats');

let loadpercent = 0;
let mempercent = 0;

let getCpuStats = setInterval(() => {
  cpuStats(10000, function(error, cpuStats) {
    if (error) return console.error('Oh noes!', error); // actually this will never happen
    let usageTotal = 0;
    //console.info(result);
    for (let i = 0; i < cpuStats.length; ++i) {
      let cpu = cpuStats[i];
      usageTotal += cpu.cpu;
    }
    loadpercent = (usageTotal / cpuStats.length).toFixed(2);
  });
}, 2500);

let calculateMemPercent = setInterval(() => {
  let free = spawn('free', ['-m']);

  free.stdout.on('data', data => {
    //console.log(`stdout: ${data}`);
    let dataArray = `${data}`.split('\n').map(s => s.split(/[ ]+/));
    let memStats = {
      total: parseInt(dataArray[1][1]),
      used: parseInt(dataArray[1][2]),
      free: parseInt(dataArray[1][3]),
      shared: parseInt(dataArray[1][4]),
      buffcache: parseInt(dataArray[1][5]),
      available: parseInt(dataArray[1][6])
    }
    mempercent = ((memStats.total - memStats.available) / memStats.total * 100).toFixed(2);
    //console.log(`${mempercent} %`);
  });

  free.stderr.on('data', data => {
    console.log(`stderr for 'free -m': ${data}`);
  });

  //free.on('close', code => {
  //  console.log(`child process exited with code ${code}`);
  //});
}, 2500);

module.exports = (app, db) => {
  app.get('/api/stats', (req, res) => {
    res.send({
      "stats": {
        type: os.type(),
        arch: os.arch(),
        platform: os.platform(),
        release: os.release(),
        uptime: moment.duration(os.uptime(), 'seconds').humanize(),
        loadavg: os.loadavg().map(function(load) {
          return load.toFixed(2)
        }),
        loadpercent: loadpercent,
        totalmem: os.totalmem(),
        freemem: os.freemem(),
        mempercent: mempercent,
        cpus: os.cpus()
      }
    });
  });
}
