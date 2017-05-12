/**
 * Created by ken on 2017/5/5.
 */
import {observable, action, autorun, computed} from 'mobx'
import {socket,getSocket} from 'socket/index'
export default class {
  @observable data = {}

  @action listen() {
    socket.lset('home.index.system.setInterval',true)
    socket.lget('home.index.system', (d) => {
      this.data = d
    })
  }
  @action removeListen() {
    socket.emit('home.index.system.clearInterval',true)
    socket.removeListener('home.index.system')
  }
}