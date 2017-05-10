/**
 * Created by ken on 2017/5/4.
 */
const config = require('../config')
const initMember = require('./initMember')// 初始化会员
module.exports = ()=>{
  global.requireRoot = function(path) {
    return require(`${config.app.path.root}/${path}`)
  }

  initMember(config)
}
