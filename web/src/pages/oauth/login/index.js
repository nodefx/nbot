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
@inject(storeName)
@observer
@create({})
export default class extends React.Component {

  render() {
    const {validateFieldsAndScroll} = this.props.form

    function handleOk() {
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          console.log('errors', errors)
        }
      })
    }

    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          Nbot
        </div>
        <form>
          <Item>
            <Input size="large" onPressEnter={handleOk} placeholder="账号"/>
          </Item>
          <Item>
            <Input size="large" type="password" onPressEnter={handleOk} placeholder="密码"/>
          </Item>
          <Row>
            <Button type="primary" size="large">
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
