/**
 * Created by ken on 2017/5/15.
 */
import React from 'react'
import {inject, observer} from 'store/index'
import {Modal, Row, Col, Form, Button, Input, InputNumber, Radio} from 'antd'
const {create, Item} = Form
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 18},
}

@create()
@observer
export default class extends React.Component {

  handleCancel() {
    this.props.store.changeState({modal: false})
    this.props.form.resetFields()
  }

  handleOk() {
    const {formitem,method} = this.props.store.state
    const {
      validateFieldsAndScroll
    } = this.props.form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return console.log('errors', errors)
      }
      if(method=='update')values._id = formitem._id
      this.props.store.postUser(values)
      this.props.form.resetFields()

    })
  }

  render() {
    const {state, enumRole} = this.props.store
    const {getFieldDecorator} = this.props.form
    const formitem = state.formitem

    return (
      <Modal
        visible={state.modal}
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        confirmLoading={state.confirmLoading}
        maskClosable={false}
        title={state.modalTitle}>
        <Form layout="horizontal">
          <Item label="账号" {...formItemLayout} hasFeedback>
            {getFieldDecorator('passport', {
              rules: [
                {required: true, message: '账号必填!'}
              ],
              initialValue: formitem.passport
            })
            (<Input  />)}
          </Item>
          {(<Item label="密码" {...formItemLayout} hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {required: true, message: '密码必填!'},
              ],
              initialValue: formitem.password
            })
            (<Input type="password"/>)}
          </Item>)}
          <Item label="角色" {...formItemLayout} hasFeedback>
            {getFieldDecorator('role', {
              rules: [
                {required: true, message: '角色必填!'},
              ],
              initialValue: formitem.role.toString()
            })
            (<Radio.Group>
              {Object.keys(enumRole).map((key) => (<Radio.Button value={key}>{enumRole[key]}</Radio.Button>))}
            </Radio.Group>)}
          </Item>
        </Form>

      </Modal>
    )
  }
}
