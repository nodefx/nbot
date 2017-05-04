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

const inject = function (...args) {
  if (typeof args[0] === 'object') {
    let keys = []
    Object.keys(args[0]).map(key => {
      if(!store[args[0][key]]){
       registerModule(args[0][key])
       }
      keys.push(args[0][key])
    })
    return injectMobx(...keys)
  }
  if(!store[args[0]]){
   registerModule(args[0])
   }
  return injectMobx(...args)
}

registerModule('common/menu')
registerModule('common/member')
registerModule('home/index')



export {
  inject,
  observer,
  store,
  registerModule
}
