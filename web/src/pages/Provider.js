/**
 * Created by ken on 2017/5/5.
 */
import React from 'react'
import {inject,Provider as ProviderMobx} from 'mobx-react'
import {observer} from 'store/index'
export default class extends React.Component {
  /*componentWillMount(){
    console.log('componentWillMount',this.props.store)
  }*/
  render() {
    const {children, store} = this.props
    return (<ProviderMobx {...store}>{children}</ProviderMobx>)
  }
}