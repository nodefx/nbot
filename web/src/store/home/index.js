/**
 * Created by ken on 2017/5/5.
 */
import {observable, action, autorun, computed} from 'mobx'
import {socket} from 'socket/index'
export default class {
  @observable data = {}

  /*constructor() {
   autorun(() => console.log(JSON.stringify(this.data)));
   }*/

  @action listenSystem() {
    socket.on('home.index.system', (d) => {
      console.log('home.index',d)
      this.data = d
    })
  }
  @action unListenSystem() {
    console.log('unListenSystem')
    socket.removeListener('home.index.system')
  }
}