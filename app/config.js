/**
 * Created by ken on 2017/4/26.
 */
const path = require('path')
const rootpath = path.dirname(__dirname)
exports.http = {
  port: 1357
}
exports.app = {
  path: {
    root: rootpath
  }
}

exports.process = {
  path: {
    root: `${rootpath}/data`,
    pid: `${rootpath}/data/pid.lock`,
    access: `${rootpath}/data/access.log`
  }
}

exports.cluster = {
  cpu: 1
}
