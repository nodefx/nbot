/**
 * Created by ken on 2017/4/29.
 */
const fs = require('fs')
const config = requireRoot('app/config')
const {log} = requireRoot('app/lib/tool')
const jwtSocket = require('./bootstrap/socket')
const moment = require('moment')
let fileList = []
let runList = {}
module.exports = function (server) {
  const io = require('socket.io').listen(server, {origins: '*:*', transports: ['websocket', 'polling']})

  new jwtSocket(io, (socket) => {
    walk(`${config.app.path.root}/app/socket/api`)
    fileList.map(v => {
      if (!runList[v]) {
        runList[v] = require(v)
      }
    })
    Object.keys(runList).map((key) => {
      if (typeof runList[key] === 'function') {
        runList[key](socket)
        log.trace('执行socket api 模块 :', key, moment().format('YYYY-MM-DD HH:mm:ss'))
      }
    })
  })
}

function walk(path) {
  let dirList = fs.readdirSync(path)
  dirList.forEach(function (item) {
    if (fs.statSync(path + '/' + item).isDirectory()) {
      walk(path + '/' + item)
    } else {
      fileList.push(path + '/' + item)
    }
  })
}
