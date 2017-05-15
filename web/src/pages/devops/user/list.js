/**
 * Created by ken on 2017/5/15.
 */
import React from 'react'
import {inject, observer} from 'store/index'
import {Table} from 'antd'
import DropOption from 'component/DropOption'
const storeName = {
  member: 'common/member'
}


@inject('appStore')
@observer
export default class extends React.Component {
  componentWillMount() {
    this.memberStore = this.props.appStore.store[storeName.member]
    this.memberStore.getMembers()
    const {enumRole} = this.memberStore
    this.columns = [{
      title: '账号',
      dataIndex: 'passport',
      key: 'passport',
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => (<span>{enumRole[text]}</span>)
    }, {
      title: '注册时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
      {
        title: '最近登陆时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => (<DropOption onMenuClick={e => this.handleMenuClick.call(this,record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />)
      }
      ]
  }
  handleMenuClick(d,e){
    console.log('handleMenuClick',d,e)
    if(e.key==='1'){
      this.memberStore.changeState({formitem: d,formadd: true})
    }
  }

  render() {
    const {memberList} = this.memberStore
    return (
      <Table dataSource={memberList} columns={this.columns} bordered/>
    )
  }
}
