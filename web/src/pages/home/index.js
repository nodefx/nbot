/**
 * Created by ken on 2017/4/11.
 */
import React from 'react'
import {Link} from 'react-router'
import {inject,observer} from 'mobx-react'
@inject('memberStore')
@observer
export default class extends React.Component {
  constructor(props){
    super(props)
    console.log('this.props.memberStore',this.props.memberStore)
    this.props.memberStore.setVal('saa')
  }
  render() {
    return (
      <div>
        <h1>nodejs devops!</h1>
        <Link to="/oauth/login">登陆</Link>{this.props.memberStore.member.name}
      </div>
    )
  }
}
