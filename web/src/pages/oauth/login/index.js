/**
 * Created by ken on 2017/4/11.
 */
import React from 'react'
import {inject,observer} from 'store'
import {Link} from 'react-router'
const storeName = {
  member: 'common/member',
  menu:'common/menu'
}
@inject(storeName)
@observer
export default class extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <h2>wellcome to nodejs devops of ns platform</h2>
         login 登陆!{this.props[storeName.member].member.name}
        <p>
          <Link to="/">首页</Link>
        </p>
      </div>
    )
  }
}
