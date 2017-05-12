/**
 * Created by ken on 2017/4/11.
 */
import React from 'react'
import {inject, observer} from 'store/index'
import {Button, Row, Form, Input} from 'antd'
const {Item, create} = Form
import styles from './index.less'
//
const storeName = {
  member: 'common/member',
  menu: 'common/menu'
}

@create()
@inject('appStore')
@observer
export default class extends React.Component {



  handleOk() {
    const {validateFieldsAndScroll} = this.props.form
    const {store} = this.props.appStore
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return console.log('errors', errors)
      }
      console.log('handleOk')
      store[storeName.member].login(values)
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form
    const {member,loading} = this.props.appStore.store[storeName.member]
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          Nbot
        </div>
        <form>
          <Item hasFeedback>
            {getFieldDecorator('passport', {
              rules: [
                {required: true,message:'账号必填!'}
              ],
              initialValue:member.passport
            })
            (<Input size="large" onPressEnter={this.handleOk.bind(this)} placeholder="账号" />)}
          </Item>
          <Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {required: true,message:'密码必填!'},
              ],
              initialValue:member.password
            })
            (<Input size="large" type="password" onPressEnter={this.handleOk.bind(this)} placeholder="密码" />)}
          </Item>
          <Row>
            <Button type="primary" size="large" loading={loading} onClick={this.handleOk.bind(this)}>
              登陆
            </Button>
            <p>
              <span>账号：admin</span>
              <span>密码：admin</span>
            </p>
          </Row>

        </form>
      </div>
    )
  }
}
