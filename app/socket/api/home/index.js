/**
 * Created by ken on 2017/5/4.
 */
module.exports = function (socket) {

  function getSystem(){
    socket.emit('home.index.system', {
      uptime: process.uptime(),
      memory: process.memoryUsage()
    })
  }


  let t = {}
  getSystem()
  t = setInterval(() => {getSystem()}, 3000)
  socket.on('disconnect', () => {
    clearInterval(t)
  })

}
