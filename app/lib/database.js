/**
 * Created by ken on 2017/4/26.
 * https://github.com/louischatriot/nedb
 */
const Datastore = require('nedb')
const config = require('../config')
let cacheDb = {}
const db = {
  model: (name = 'database') => {
    if (!cacheDb[name]) {
      cacheDb[name] = new Datastore({filename: `${config.app.path.root}/data/${name}.db`, autoload: true})
      toPromise(cacheDb[name])
    }
    return cacheDb[name]
  }
}
module.exports = db

function toPromise(o) {
  const wl = ['insert', 'find', 'update', 'findOne', 'remove']
  Object.getOwnPropertyNames(o.__proto__).map((key) => {
    if (wl.indexOf(key) > -1) {
      o[key + 'Async'] = promisify(o[key], o)
    }
  })
}

let promisify = (fn, receiver) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, (err, res) => {
        return err ? reject(err) : resolve(res)
      }])
    })
  }
}
