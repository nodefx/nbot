/**
 * Created by ken on 2017/4/27.
 */
const {exec} = require('child_process')
const conf = require('./config')
const fs = require('fs')
if (!fs.existsSync(conf.process.path.root)) {
  fs.mkdirSync(conf.process.path.root)
}
exec(`nohup node index.js > ${conf.process.path.access} 2>&1 & echo $! > ${conf.process.path.pid}`)
