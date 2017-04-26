/**
 * Created by ken on 2017/4/26.
 */
const path = require('path')
const rootpath = path.dirname(__dirname)
exports.http = {
  port: 1357
}
exports.app = {
  rootpath: rootpath
}

exports.process = {
  path: {
    pid: `${rootpath}/data/pid.lock`,
    stdout: `${rootpath}/data/stdout.log`,
    stderr: `${rootpath}/data/stderr.log`
  }
}
