const recluster = require('recluster')
const path = require('path')
const {log} = require('./lib/tool')
const conf = require('./config')
const cluster = recluster(path.join(__dirname, 'server.js'), {workers: conf.cluster.cpu})
cluster.run()
process.on('SIGUSR2', function () {
  log.info(`Got SIGUSR2, reloading cluster...`)
  cluster.reload()
})
log.info('spawned cluster, kill -s SIGUSR2', process.pid, 'to reload')
