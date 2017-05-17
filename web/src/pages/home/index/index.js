/**
 * Created by ken on 2017/4/11.
 */
import React from 'react'
import {Link} from 'react-router'
import {inject, observer} from 'store/index'
import {Icon, Card} from 'antd'
import styles from './index.less'
const storeName = {
  home: 'home/index'
}
@inject('appStore')
@observer
export default class extends React.Component {
  componentWillMount() {
    this.props.appStore.register(storeName)
    this.props.appStore.store[storeName.home].listen()
  }

  componentWillUnmount() {
    this.props.appStore.store[storeName.home].removeListen()
  }

  uptime(uptime) {
    return parseInt(uptime / 86400) + '天' + parseInt(uptime % 86400 / 3600) + '小时' + parseInt(uptime % 86400 % 3600 / 60) + '分钟' + parseInt(uptime % 86400 % 3600 % 60) + '秒';
  }

  render() {
    const {data} = this.props.appStore.store[storeName.home]
    return (
      <div>
        <h1>nodejs devops!</h1>
        <h2>{JSON.stringify(data)}</h2>
        <Card className={styles.cardItem} title='运行时间'>
          <Icon type="clock-circle-o"/>
          {this.uptime(data.uptime)}
        </Card>
      </div>
    )
  }
}
