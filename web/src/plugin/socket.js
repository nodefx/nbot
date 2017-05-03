/**
 * Created by ken on 2017/4/29.
 */
const io = require('socket.io-client')
export const socket = io()
export const socketAsync = function (name) {
  return new Promise((resolve) => {
    socket.on(name, function (d) {
      resolve(d)
    })
  })

}
export default () => {
  console.log('socket bootstrap 1');
  socket.on('connetion', function (data) {
    console.log(data)
  })
}
