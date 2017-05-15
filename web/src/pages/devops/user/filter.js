/**
 * Created by ken on 2017/5/15.
 */
import React from 'react'
import {inject, observer} from 'store/index'
import {Table, Row, Col, Form, Button} from 'antd'
const {create} = Form
const storeName = {
  member: 'common/member'
}

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}
const TwoColProps = {
  ...ColProps,
  xl: 96,
}

@create()
@inject('appStore')
@observer
export default class extends React.Component {

  componentWillMount() {
    this.memberStore = this.props.appStore.store[storeName.member]

  }

  addMember() {
    this.memberStore.changeState({formadd: true})
  }


  render() {
    //const {getFieldDecorator} = this.props.form
    return (
      <Row gutter={24}>

        <Col {...TwoColProps} xl={{span: 10}} md={{span: 24}} sm={{span: 24}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <Button size="large" type="primary" onClick={this.addMember.bind(this)}>创建用户</Button>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}
