/**
 * Created by ken on 2017/5/4.
 */
module.exports = function (socket) {
  console.log('connection socket')
  let t = {}
  socket.on('server_process', () => {
    socket.emit('client_process', {
      uptime: process.uptime(),
      memory: process.memoryUsage()
    })
    t = setInterval(() => {
      socket.emit('client_process', {
        uptime: process.uptime(),
        memory: process.memoryUsage()
      })
    }, 3000)
  })

  socket.on('disconnect', () => {
    clearInterval(t)
  })

}
