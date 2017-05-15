/**
 * Created by ken on 2017/4/11.
 */
import {message} from 'antd';
import {socket} from 'socket/index'
import {observable, action, autorun, computed} from 'mobx'
import localstorage from 'plugin/localstorage'
import {browserHistory} from 'react-router'
const localMember = localstorage.get('member')
export default class {
  @observable member = (Object.keys(localMember).length > 0) ? localMember : {
      passport: '',
      password: ''
    }
  @observable loading = false
  @observable memberList = []
  @observable state = {
    loading:false,
    formadd:false,
    formitem:{},
    confirmLoading:false,
    modalTitle:'创建用户'
  }
  enumRole = {
    '1':`超级管理员`,
    '0':`游客`,
    '-1':`禁止用户`,
    '2':`项目管理员`
  }


  @action login(member) {
    this.loading = true
    socket.emit('oauth.member.login', member)
    socket.once('oauth.member.login', (d) => {
      this.loading = false
      const {msg, code, data} = d
      if (code == 0) {
        message.success(msg)
        this.member = data
        localstorage.set('member', data)
        socket.emit('jwtToken', data.token)
        browserHistory.push('/')
      } else {
        message.error(msg)
      }
    })
  }

  @action logout() {
    localstorage.remove('member')
    this.member = {}
    browserHistory.push('/oauth/login')
  }

  @action getMembers() {
    socket.emit('member.index.list',true)
    socket.once('member.index.list', (d) => {
      this.memberList = d.data
    })
  }
  @action changeState(o={}){
    this.state = Object.assign(this.state,o)
  }

}
