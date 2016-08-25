'use strict';
const os = require('os');
const spawn = require('child_process').spawn;
const moment = require('moment');
const osUsage = require('os-usage');

let loadpercent = 0;
let mempercent = 0;

// create an instance of CpuMonitor
const cpuMonitor = new osUsage.CpuMonitor();

// watch cpu usage overview
cpuMonitor.on('cpuUsage', function(data) {
    console.log(data);

    // { user: '9.33', sys: '56.0', idle: '34.66' }
});

// watch processes that use most cpu percentage
cpuMonitor.on('topCpuProcs', function(data) {
    console.log(data);

    // [ { pid: '21749', cpu: '0.0', command: 'top' },
    //  { pid: '21748', cpu: '0.0', command: 'node' },
    //  { pid: '21747', cpu: '0.0', command: 'node' },
    //  { pid: '21710', cpu: '0.0', command: 'com.apple.iCloud' },
    //  { pid: '21670', cpu: '0.0', command: 'LookupViewServic' } ]
});

let calculateLoadPercent = setInterval(() => {
  let usageTotal = 0;
  let idleTotal = 0;
  let cpus = os.cpus();
  console.log(JSON.stringify(cpus, null, 2));
  for (let i = 0; i < cpus.length; ++i) {
    let cpu = cpus[i];
    usageTotal += cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq;
    idleTotal += cpu.times.idle;
  }
  loadpercent = (usageTotal / (usageTotal + idleTotal) * 100).toFixed(2);
  console.log(`Load: ${loadpercent}`);
}, 1000);


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
}, 5000);

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
