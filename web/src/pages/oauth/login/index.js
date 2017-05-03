/**
 * Created by ken on 2017/4/11.
 */
import React from 'react'
import {inject, observer} from 'store'
import {Button, Row, Form, Input} from 'antd'
const {Item, create} = Form
import styles from './index.less'
console.log('styles',styles)
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

        </div>
        <form>
          <Item>
            <Input size="large" onPressEnter={handleOk} placeholder="Username"/>
          </Item>
          <Item>
            <Input size="large" type="password" onPressEnter={handleOk} placeholder="Password"/>
          </Item>
          <Row>
            <Button type="primary" size="large">
              Sign in
            </Button>
            <p>
              <span>Username：guest</span>
              <span>Password：guest</span>
            </p>
          </Row>

        </form>
      </div>
    )
  }
}
