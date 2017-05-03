/**
 * Created by ken on 2017/4/11.
 */
import React from 'react'
import {Link} from 'react-router'
import {inject, observer} from 'store'
import {socket} from 'plugin/socket'
const storeName = {
  member: 'common/member'
}
@inject(storeName)
@observer
export default class extends React.Component {
  state = {
    proc: {}
  }

  constructor(props) {
    super(props)
    this.process()
    console.log('this.props', this.props)
    this.props[storeName.member].setVal('saa')
  }

  process() {
    console.log('process')
    socket.emit('server_process')
    socket.on('client_process', (d) => {
      this.setState({proc: d})
    })
  }

  render() {
    let {proc} = this.state
    proc = JSON.stringify(proc)
    return (
      <div>
        <h1>nodejs devops!</h1>
        <Link to="/oauth/login">登陆</Link>{this.props[storeName.member].member.name}
        <h2>{proc}</h2>
      </div>
    )
  }
}
