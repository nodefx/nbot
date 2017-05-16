/**
 * Created by ken on 2017/5/16.
 */
const {log} = requireRoot('app/lib/tool')
const config = requireRoot('app/config')
const wl = [`constructor`, `end`, `success`, `error`]
module.exports = class {
  constructor(socket, path, clsPrototype) {
    this.socket = socket
    //
    let cat = path.replace(`${config.app.path.root}/app/socket/api/`, '').replace('.js', '').replace('/', '.')
    Object.getOwnPropertyNames(clsPrototype).map((fn) => {
      if ('function' === typeof this[fn] && wl.indexOf(fn) === -1) {
        cat = `${cat}.${fn}`
        socket.on(cat, async(d) => {
          try {
            await this[fn](d, cat)
          } catch (e) {
            log.error(e)
          }
        })
      }
    })
  }

  end(cat, emitContent) {
    this.socket.emit(cat, emitContent)
  }

  success(cat, data = {}, msg = '', code = 0) {
    this.socket.emit(cat, {code: code, msg: msg, data: data})
  }

  error(cat, data = {}, msg = '', code = 1) {
    this.socket.emit(cat, {code: code, msg: msg, data: data})
  }
}