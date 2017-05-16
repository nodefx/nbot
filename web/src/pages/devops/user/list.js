/**
 * Created by ken on 2017/5/15.
 */
import React from 'react'
import {inject, observer} from 'store/index'
import {Table} from 'antd'
import DropOption from 'component/DropOption'
@observer
export default class extends React.Component {
  componentWillMount() {
    this.props.store.getMembers()
    const {enumRole} = this.props.store
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
        render: (text, record) => (<DropOption onMenuClick={e => this.handleMenuClick.call(this, record, e)}
                                               menuOptions={[{key: '1', name: 'Update'}, {key: '2', name: 'Delete'}]}/>)
      }
    ]
  }

  handleMenuClick(d, e) {
    console.log('handleMenuClick', d, e)
    if (e.key === '1') {
      this.props.store.changeState({formadd: true, formitem: d})
    }
  }

  render() {
    const {memberList} = this.props.store
    return (
      <Table dataSource={memberList} columns={this.columns} bordered/>
    )
  }
}
