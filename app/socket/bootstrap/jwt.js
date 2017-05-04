/**
 * Created by ken on 2017/5/4.
 */
const jwt = require('jsonwebtoken')
const config = requireRoot('app/config')
exports.sign = function (o) {
  return jwt.sign(o, config.jwt.code)
}

exports.verify = function(token) {
  return jwt.verify(token, config.jwt.code)
}
