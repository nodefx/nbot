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
  cpu: 1 // 为了兼容socket 采取 内存级别的数据共享机制 ::TODO 接入redis 可以做分布式共享
}
