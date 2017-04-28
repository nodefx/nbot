/**
 * Created by ken on 2017/4/29.
 */
module.exports = function (app) {
  const http = require('http')
  const server = http.Server(app.callback())
  const io = require('socket.io')(server)

  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  })

}