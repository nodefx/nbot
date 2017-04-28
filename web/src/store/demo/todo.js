/**
 * Created by ken on 2017/4/11.
 */

import {observable, action, autorun, computed} from 'mobx'
export default class {
  @observable todos = []


  @computed get getVal() {
    return JSON.stringify(this.todos)
  }

  @action addTodos(todo) {
    this.todos.push(todo)
  }
}
