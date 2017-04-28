/**
 * Created by ken on 2017/4/11.
 */
import React from 'react'
import {inject,observer} from 'mobx-react'
import {Link} from 'react-router'
@inject('memberStore','menuStore')
@observer
export default class extends React.Component {
  constructor(props){
    super(props)
    if(!this.props.memberStore.member.name)this.props.memberStore.init()
    if(!this.props.menuStore.data.name)this.props.menuStore.init()
  }
  render() {
    const {memberStore,menuStore} = this.props
    return (
      <div>
        <h2>wellcome to nodejs devops of ns platform</h2>
         login 登陆!{memberStore.member.name} - {menuStore.data.name} !
        <p>
          <Link to="/">首页</Link>
        </p>
      </div>
    )
  }
}
