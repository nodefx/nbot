/**
 * Created by ken on 2017/5/4.
 */
module.exports = function (socket) {

  function getSystem() {
    return {
      uptime: process.uptime(),
      memory: process.memoryUsage()
    }
  }

  //定时任务
  let t = {}
  t = setInterval(() => {
    socket.emit('home.index.system', getSystem())
  }, 3000)
  socket.on('disconnect', () => {
    clearInterval(t)
  })
  //实时监听
  socket.on('home.index.system', (d) => {
    socket.emit('home.index.system', getSystem())
  })
}
