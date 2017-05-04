/**
 * Created by ken on 2017/5/4.
 */
const config = require('../config')

module.exports = ()=>{
  global.requireRoot = function(path) {
    return require(`${config.app.path.root}/${path}`)
  }
}
