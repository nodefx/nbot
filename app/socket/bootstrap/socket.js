/**
 * Created by ken on 2017/5/4.
 */
const {verify} = require('./jwt')
const {log} = requireRoot('app/lib/tool')
class jwtSocket {
  constructor(io, fn) {
    this.member = {}
    try {
      io.on('connection', this.jwt())
      io.on('auth', this.auth(fn))
    } catch (e) {
      this.LOG.error(e)
    }
  }

  /**
   * 鉴权函数
   * @returns {function()}
   */
  jwt() {
    return async(socket) => {
      try {
        // 客户端鉴权
        socket.on('jwt', async(token) => {
          if (token) {
            this.member = verify(token)
            if (Object.keys(this.member).length === 0) {
              return socket.emit('jwt.fail')
            }
            log.trace('connect jwt socket', JSON.stringify(this.member))
          }
          this.member.socketId = socket.id
          // 注册命名空间
          this.registerNameSpace(socket, 'auth')
          //
          return socket.emit('auth', this.member)
        })
      } catch (e) {
        log.error('jwt', e)
      }
    }
  }

  /**
   * 授权后的执行
   * @returns {function()}
   */
  auth(fn) {
    return async(socket) => {
      try {
        log.trace('==========进入socket消息封装============')
        fn.call(this, socket)
      } catch (e) {
        log.error(e)
      }
    }
  }

  /**
   * 注册新的监听对象
   * @param socket
   * @param listenName 监听名字
   */
  registerNameSpace(socket, listenName = 'auth') {
    const server = socket.server
    if (!server.$emit) {
      // then is socket.io 1.0
      let Namespace = Object.getPrototypeOf(server.sockets).constructor
      if (!~Namespace.events.indexOf(listenName)) {
        Namespace.events.push(listenName)
      }
    }
    if (server.$emit) {
      server.$emit(listenName, socket)
    } else {
      // try getting the current namespace otherwise fallback to all sockets.
      let namespace = (server.nsps && socket.nsp &&
        server.nsps[socket.nsp.name]) ||
        server.sockets
      // explicit namespace
      namespace.emit(listenName, socket)
    }
  }
}

module.exports = jwtSocket