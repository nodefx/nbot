/**
 * Created by ken on 2017/4/11.
 */
import {inject as injectMobx, observer} from 'mobx-react'
const store = {}
const registerModule = function (StoreName) {
  if (!store[StoreName]) {
    try {
      const Cls = require(`store/${StoreName}`).default
      store[StoreName] = new Cls()
    } catch (e) {
      console.error(e)
    }
  }
}

registerModule('common/menu')
registerModule('common/member')
const inject = function (...args) {
  if (typeof args[0] === 'object') {
    let keys = []
    Object.keys(args[0]).map(key => {
      keys.push(args[0][key])
    })
    return injectMobx(...keys)
  }
  return injectMobx(...args)
}
export {
  inject,
  observer,
  store,
  registerModule
}
