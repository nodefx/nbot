/**
 * Created by ken on 2017/4/27.
 */
const {spawn} = require('child_process')
const fs = require('fs')
const log4js = require('log4js')
const logger = log4js.getLogger();
exports.log = logger
exports.cmd = function (action, args = [], stdout, stderr) {
  let child = spawn(action, args)
  child.stdout.on('data', (data) => {
    data = data.toString().replace(/[\n\r]/g, '')
    logger.info(data)
    stdout && stdout(data)
  })

  child.stderr.on('data', (data) => {
    data = data.toString().replace(/[\n\r]/g, '')
    logger.error(data)
    stderr && stderr(data)
  })
}

exports.debugLog = function (ctx) {
  logger.debug(`ctx.request.body`, ctx.request.body)
  logger.debug(`ctx.req.headers`, ctx.req.headers)
}
exports.readFile = function (src) {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}


exports.formatTime = function (date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
  var o = {
    'M+': date.getMonth() + 1,                 // 月份
    'd+': date.getDate(),                    // 日
    'h+': date.getHours(),                   // 小时
    'm+': date.getMinutes(),                 // 分
    's+': date.getSeconds(),                 // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds()             // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
