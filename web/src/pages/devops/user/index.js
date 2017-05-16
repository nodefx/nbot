/**
 * Created by ken on 2017/5/3.
 */
import React from 'react'
import List from './list'
import Filter from './filter'
import Modal from './modal'
import {inject, observer} from 'store/index'
const storeName = {
  member: 'common/member'
}
@inject('appStore')
@observer
export default class extends React.Component {
  componentWillMount() {
    this.memberStore = this.props.appStore.store[storeName.member]
  }

  render() {
    return (
      <div>
        <Filter store={this.memberStore}/>
        <List store={this.memberStore}/>
        <Modal store={this.memberStore}/>
      </div>
    )
  }
}
