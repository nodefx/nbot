/**
 * Created by ken on 2017/5/5.
 */
import {observable, action, autorun, computed} from 'mobx'
import {inject, observer, Provider} from 'mobx-react'
class Store {
  @observable store = {}
  @action register(stores) {
    if (typeof stores === 'object') {
      Object.keys(stores).map(key => {
        if (!this.store[stores[key]]) {
          this.registerItem(stores[key])
        }
      })
      return
    }
    if (!this.store[stores]) {
      this.registerItem(stores)
    }
  }
  @action registerItem(StoreName){
    if (!this.store[StoreName]) {
      try {
        const Cls = require(`store/${StoreName}`).default
        this.store[StoreName] = new Cls()
      } catch (e) {
        console.error('store/index',e)
      }
    }
  }
}
const appStore = new Store()
export {
  appStore,
  inject,
  observer,
  Provider
}