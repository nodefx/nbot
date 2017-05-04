/**
 * Created by ken on 2017/4/11.
 */
import React from 'react'
import {Link} from 'react-router'
import {inject, observer} from 'store/index'
import {socket} from 'socket/index'
const storeName = {
  home: 'home/index'
}
@inject(storeName)
@observer
export default class extends React.Component {

  componentDidMount() {
    this.props[storeName.home].listenSystem()
  }

  componentWillUnmount() {
    this.props[storeName.home].unListenSystem()
  }

  render() {
    let proc = JSON.stringify(this.props[storeName.home].data)
    return (
      <div>
        <h1>nodejs devops!</h1>
        <Link to="/oauth/login">登陆</Link>
        <h2>{proc}</h2>
      </div>
    )
  }
}
