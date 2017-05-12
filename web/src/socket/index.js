/**
 * Created by ken on 2017/4/29.
 */
import io from 'socket.io-client'
import localstorage from 'plugin/localstorage'
import { browserHistory } from 'react-router'
const member = localstorage.get('member')
let host = (process.env.NODE_ENV === 'development') ? ':1357' : ''
export const socket = io(host)
socket.lget = (name, cb) => {
  socket.emit(name, true)
  socket.on(name, cb)
}

socket.lset = (name, data) => {
  socket.emit(name, data)
  socket.on(name, () => {
    socket.emit(name, data)
  })
}

export default () => {
  socket.on('connetion', function (data) {
    if (member.token) {
      socket.emit('jwtToken', member.token)
    }
    socket.on('jwt', (d)=>{
      if(!d){
        localstorage.remove('member')
        browserHistory.push('/oauth/login')
      }
    })
  })
}
