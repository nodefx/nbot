/**
 * Created by ken on 2017/5/3.
 */
import React from 'react'
import List from './list'
import Filter from './filter'
import Modal from './modal'
export default class extends React.Component {
  render() {
    return (
      <div>
        <Filter />
        <List />
        <Modal />
      </div>
    )
  }
}
