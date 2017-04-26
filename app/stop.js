/**
 * Created by ken on 2017/4/26.
 */
const fs = require('fs')
const {exec} = require('child_process')
const conf = require('./config')
process.on('exit', function () {
  let bf = fs.readFileSync(conf.process.path.pid)
  let pid = bf.toString('utf8')
  pid = parseInt(pid)
  fs.unlinkSync(conf.process.path.pid)
  exec(`kill -9 ${pid}`)
  console.log('Bye.', process.pid, pid)
})

process.on('uncatchException', function (e) {
  console.log(e)
  process.exit(1)
})

process.exit(0)