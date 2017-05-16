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
    this.props.store.changeState({formadd: false})
  }

  handleOk() {
    const {
      validateFieldsAndScroll
    } = this.props.form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return console.log('errors', errors)
      }
      console.log('handleOk', values)
      this.props.store.changeState({confirmLoading: true})

    })
  }

  render() {
    const {state, enumRole} = this.props.store
    const {getFieldDecorator} = this.props.form
    return (
      <Modal
        visible={state.formadd}
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
              initialValue: state.formitem.passport || ''
            })
            (<Input  />)}
          </Item>
          <Item label="密码" {...formItemLayout} hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {required: true, message: '密码必填!'},
              ],
              initialValue: state.formitem.password || ''
            })
            (<Input type="password"/>)}
          </Item>
          <Item label="角色" {...formItemLayout} hasFeedback>
            {getFieldDecorator('role', {
              rules: [
                {required: true, message: '角色必填!'},
              ],
              initialValue: state.formitem.role && state.formitem.role.toString() || '0'
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
