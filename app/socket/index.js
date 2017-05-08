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
/**
 * 遍历目录
 * @param path
 */
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

module.exports = function (server) {
  const io = require('socket.io').listen(server, {origins: '*:*', transports: ['websocket', 'polling']})

  new jwtSocket(io, (socket) => {

    /**
     * 绑定监听 与get 互用
     * @param name 监听名称
     * @param data 提交数据
     */
    function bindSocket(name,data) {
      socket.on(name, () => {
        socket.emit(name, data)
      })
    }

    /**
     * 获取socket 数据 与 bind 互用
     * @param name 监听名称
     * @param cb  获取回调数据
     */
    function getSocket(name,cb){
      socket.emit(name,true)
      socket.on(name, cb)
    }

    walk(`${config.app.path.root}/app/socket/api`)
    fileList.map(v => {
      if (!runList[v]) {
        runList[v] = require(v)
      }
    })
    Object.keys(runList).map((key) => {
      if (typeof runList[key] === 'function') {
        runList[key](socket,bindSocket,getSocket)
        log.trace('执行socket api 模块 :', key, moment().format('YYYY-MM-DD HH:mm:ss'))
      }
    })
  })
}