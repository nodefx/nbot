/**
 * Created by ken on 2017/5/3.
 */
import React from 'react'
import {inject, observer} from 'store/index'
const storeName = {
  project: 'devops/project'
}
@inject('appStore')
@observer
export default class extends React.Component {
  componentWillMount(){
    this.props.appStore.register(storeName)
  }
  componentDidMount() {
    this.props.appStore.store[storeName.project].listen()
  }
  componentWillUnmount() {
    this.props.appStore.store[storeName.project].removeListen()
  }
  render() {
    const {data} = this.props.appStore.store[storeName.project]
    return (<div>project {JSON.stringify(data)}</div>)
  }
}
