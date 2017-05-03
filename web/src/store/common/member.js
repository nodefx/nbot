/**
 * Created by ken on 2017/4/11.
 */
import {observable, action, autorun, computed} from 'mobx'
export default class {
  @observable member = {
    name: 'ken'
  }

  @computed get getVal() {
    return JSON.stringify(this.member)
  }

  @action setVal(name = '') {
    this.member.name = name
  }
}
