/**
 * Created by ken on 2017/4/11.
 */
import {observable, action, autorun, computed} from 'mobx'
export default class {
  @observable data = {name:''}



  @action init() {
    this.data = {
      name: '菜单'
    }
  }

  @computed get getVal() {
    return JSON.stringify(this.data)
  }

  @action setVal(name = '') {
    this.data.name = name
  }
}
