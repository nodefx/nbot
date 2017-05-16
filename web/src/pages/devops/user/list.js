/**
 * Created by ken on 2017/5/15.
 */
import React from 'react'
import {inject, observer} from 'store/index'
import {Table, Tag, Modal} from 'antd'
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
      render: (text, record) => {
        let color = ''
        text = text.toString()
        switch (text) {
          case '-1':
            color = '#f50';
            break
          case '0':
            color = '#87d068';
            break
          case '1':
            color = '#108ee9';
            break
          case '2':
            color = '#2db7f5';
            break

        }
        return (<Tag color={color}>{enumRole[text]}</Tag>)
      }
    }, {
      title: '注册时间',
      dataIndex: 'createTxt',
      key: 'createAt',
    },
      {
        title: '最近登陆时间',
        dataIndex: 'updateTxt',
        key: 'updateAt',
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          return (<DropOption onMenuClick={e => this.handleMenuClick.call(this, record, e)}
                              menuOptions={[{key: '1', name: '修改'}, {key: '2', name: '删除'}]}/>)
          //return (<span><span className="ant-divider"/><a >修改</a><span className="ant-divider"/><a >删除</a></span>)
        }
      }
    ]
  }

  handleMenuClick(d, e) {
    if (e.key === '1') {
      console.log(`handleMenuClick`, JSON.stringify(d))
      this.props.store.changeState({modal: true, formitem: d, method: 'update', modalTitle: '更新用户'})
    } else {
      const {store} = this.props
      Modal.confirm({
        title: '是否删除该用户?',
        onOk(){
          store.removeUser(d._id)
        }
      })
    }
  }

  render() {
    const {memberList} = this.props.store
    return (
      <Table dataSource={memberList} columns={this.columns} bordered/>
    )
  }
}
