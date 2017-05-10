/**
 * Created by ken on 2017/4/11.
 */
import {message} from 'antd';
import {socket,getSocket,getOnceSockdt} from 'socket/index'
import {observable, action, autorun, computed} from 'mobx'
let i = 0
export default class {
  @observable member = {
    passport: '',
    password: ''
  }
  @observable loading = false


  @action login(member) {
    this.loading = true
    console.log('member login',i++)
    socket.emit('oauth.member.login',member)
    socket.once('oauth.member.login',(d)=>{
      console.log(d)
      this.loading = false
      const {msg,code,data} = d
      if(code==0){
        message.success(msg)
        this.member = data
      }else {
        message.error(msg)
      }
    })
  }

  @action logout() {

  }
}
