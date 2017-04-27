const cluster = require("cluster");
const conf = require('./config')
if (cluster.isMaster) {
  // this is the master control process
  console.log("Control process running: PID=" + process.pid);

  // fork as many times as we have CPUs
  const numCPUs = conf.cluster.cpu || require("os").cpus().length

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });
  // handle unwanted worker exits
  cluster.on("exit", function (worker, code) {
    if (code != 0) {
      console.log("Worker crashed! Spawning a replacement.");
      cluster.fork();
    }
  });

  process.on("SIGUSR2", function () {
    console.log("SIGUSR2 received, reloading workers");
  });
} else {
  require("./httpserver");
}