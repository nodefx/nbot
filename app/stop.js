/**
 * Created by ken on 2017/4/26.
 */
const fs = require('fs')
const conf = require('./config')
const {cmd} = require('./lib/tool')
process.on('exit', function () {
  let bf = fs.readFileSync(conf.process.path.pid)
  let pid = bf.toString('utf8')
  pid = parseInt(pid)
  fs.unlinkSync(conf.process.path.pid)
  cmd(`kill`, ['-9', pid])
  console.log('Bye.', process.pid, pid)
})

process.on('uncatchException', function (e) {
  console.error(e)
  process.exit(1)
})

process.exit(0)
