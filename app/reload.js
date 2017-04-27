/**
 * Created by ken on 2017/4/27.
 */
const fs = require('fs')
const conf = require('./config')
const {cmd} = require('./tool')
let bf = fs.readFileSync(conf.process.path.pid)
let pid = bf.toString('utf8')
pid = parseInt(pid)
cmd('kill',['-s','SIGUSR2',pid])
console.log('reload server',`kill -s SIGUSR2 ${pid}`)