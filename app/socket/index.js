/**
 * Created by ken on 2017/4/29.
 */
const fs = require('fs')
const config = requireRoot('app/config')
const {log} = requireRoot('app/lib/tool')
const moment = require('moment')
const {verify, sign} = requireRoot('app/lib/jwt')
let fileList = []
let runList = {}
let whiteList = [
  `${config.app.path.root}/app/socket/api/oauth/member`
]
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
  io.on('connection', (socket) => {
    socket.lget = (name, cb) => {
      socket.emit(name, true)
      socket.on(name, cb)
    }

    socket.lset = (name, data) => {
      socket.emit(name, data)
      socket.on(name, () => {
        socket.emit(name, data)
      })
    }
    socket.emit('connetion', 'connetion success')
    //白名单模块
    whiteList.map((v) => {
      runMod(v, socket)
    })
    //授权监听
    socket.on('jwtToken', async(token) => {
      this.member = verify(token) || false
      this.member.sid = socket.id
      if (this.member) {
        mods.call(this, socket)
      }
      socket.emit('jwt', this.member)
    })

  })
}

function runMod(path, socket) {
  const socketMod = require(path)
  if (typeof socketMod === 'function') {
    socketMod.call(this, socket)
    log.trace('执行socket api 模块 :', path, moment().format('YYYY-MM-DD HH:mm:ss'))
  }
}

function mods(socket) {
  //编译api层 通用模块
  walk(`${config.app.path.root}/app/socket/api`)
  fileList.map(v => {
    if ((!runList[v] && whiteList.indexOf(v) === -1)) {
      runMod.call(this, v, socket)
    }
  })
}
