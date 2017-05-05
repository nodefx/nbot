/**
 * Created by ken on 2017/4/29.
 */
const io = require('socket.io-client')
let host = (process.env.NODE_ENV === 'development')?':1357':''
export const socket = io(host)
export const getSocket = (name,cb)=>{
  socket.emit(name,true)
  socket.on(name, cb)
}
export default () => {
  socket.on('connetion', function (data) {
    console.log(data)
  })
}
