/**
 * Created by ken on 2017/4/11.
 */
import React from 'react'
import {Link} from 'react-router'
import {inject, observer} from 'store/index'
const storeName = {
  home: 'home/index'
}
@inject('appStore')
@observer
export default class extends React.Component {
  componentWillMount(){
    this.props.appStore.register(storeName)
    this.props.appStore.store[storeName.home].listen()
  }
  componentWillUnmount() {
    this.props.appStore.store[storeName.home].removeListen()
  }

  render() {
    const {data} = this.props.appStore.store[storeName.home]
    return (
      <div>
        <h1>nodejs devops!</h1>
        <Link to="/oauth/login">登陆</Link>
        <h2>{JSON.stringify(data)}</h2>
      </div>
    )
  }
}
