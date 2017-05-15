/**
 * Created by ken on 2017/5/4.
 */
const os = require('os')
const {log} = requireRoot('app/lib/tool')
let Interval = 0
function getSystem() {
  return {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    os:os.totalmem()
  }
}
module.exports = function (socket) {

  //定时任务
  let t = {}

  //实时监听
  socket.lset('home.index.system', getSystem())
  let i = 0
  socket.lget('home.index.system.setInterval', () => {
    log.trace('home.index.system.setInterval.init',Interval)
    if(Interval===0) {
      t = setInterval(() => {
        log.trace('home.index.system.setInterval', i++, process.pid,Interval)
        socket.emit('home.index.system', getSystem())
      }, 3000)
      Interval++
    }
  })

  socket.on('home.index.system.clearInterval', () => {
    log.trace('home.index.system.clearInterval',Interval)
    clearInterval(t)
    Interval = 0
  })

  socket.on('disconnect', () => {
    log.trace('disconnect home.index.system.clearInterval',Interval)
    clearInterval(t)
    Interval = 0
  })
}
