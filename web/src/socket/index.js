/**
 * Created by ken on 2017/4/29.
 */
const io = require('socket.io-client')
export const socket = io()
export const getSocket = (name,cb)=>{
  socket.emit(name,true)
  socket.on(name, cb)
}
export default () => {
  socket.on('connetion', function (data) {
    console.log(data)
  })
}
