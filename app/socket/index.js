/**
 * Created by ken on 2017/4/29.
 */
module.exports = function (server) {
  const io = require('socket.io').listen(server)
  io.on('connection', (socket) => {
    console.log('connection socket')
    socket.emit('connetion', {connetion: true})
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
  })

}