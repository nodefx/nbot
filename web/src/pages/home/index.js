/**
 * Created by ken on 2017/4/11.
 */
import React from 'react'
import {Link} from 'react-router'
import {inject, observer} from 'mobx-react'
import {socket} from 'plugin/socket'
@inject('memberStore')
@observer
export default class extends React.Component {
  state = {
    proc: {}
  }

  constructor(props) {
    super(props)
    //console.log('this.props.memberStore',this.props.memberStore)
    this.props.memberStore.setVal('saa')
    this.process()
  }

  process() {
    console.log('process')
    socket.emit('server_process')
    socket.on('client_process', (d) => {
      console.log(d)
      this.setState({proc:d})
    })
  }

  render() {
    console.log(this.state)
    let {proc} = this.state
    proc = JSON.stringify(proc)
    return (
      <div>
        <h1>nodejs devops!</h1>
        <Link to="/oauth/login">登陆</Link>{this.props.memberStore.member.name}
        <h2>{proc}</h2>
      </div>
    )
  }
}
