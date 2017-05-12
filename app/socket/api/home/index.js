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

  //实时监听
  socket.lset('home.index.system', getSystem())
  let i = 0
  socket.lget('home.index.system.setInterval', () => {
    console.log('home.index.system.setInterval')
    t = setInterval(() => {
      console.log('home.index.system.setInterval', i++)
      socket.emit('home.index.system', getSystem())
    }, 3000)
  })

  socket.on('home.index.system.clearInterval', () => {
    console.log('home.index.system.clearInterval')
    clearInterval(t)
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
    clearInterval(t)
  })
}
