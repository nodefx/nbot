/**
 * Created by ken on 2017/5/5.
 */
import {observable, action, autorun, computed} from 'mobx'
import {socket,getSocket} from 'socket/index'
export default class {
  @observable data = {}

  @action listen() {
    getSocket('devops.project.index', (d) => {
      this.data = d
    })
  }
  @action removeListen() {
    socket.removeListener('devops.project.index')
  }
}