/**
 * Created by ken on 2017/4/11.
 */
import {message} from 'antd';
import {socket,getSocket,getOnceSockdt} from 'socket/index'
import {observable, action, autorun, computed} from 'mobx'
import localstorage from 'plugin/localstorage'
import { browserHistory } from 'react-router'
const localMember = localstorage.get('member')
console.log('localMember',localMember)
export default class {
  @observable member = (Object.keys(localMember).length>0)?localMember:{
    passport: '',
    password: ''
  }
  @observable loading = false


  @action login(member) {
    this.loading = true
    socket.emit('oauth.member.login',member)
    socket.once('oauth.member.login',(d)=>{
      this.loading = false
      const {msg,code,data} = d
      if(code==0){
        message.success(msg)
        this.member = data
        localstorage.set('member',data)
        browserHistory.push('/')
      }else {
        message.error(msg)
      }
    })
  }

  @action logout() {
    localstorage.remove('member')
    this.member = {}
    browserHistory.push('/oauth/login')
  }
}
