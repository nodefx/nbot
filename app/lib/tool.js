/**
 * Created by ken on 2017/4/27.
 */
const {spawn} = require('child_process')
const fs = require('fs')
const colors = require('colors/safe')
exports.cmd = function (action, args = [], stdout, stderr) {
  let child = spawn(action, args)
  child.stdout.on('data', (data) => {
    console.log(colors.blue(`跟踪: ${data}`))
    stdout && stdout(data)
  })

  child.stderr.on('data', (data) => {
    console.log(colors.yellow(`警告: ${data}`))
    stderr && stderr(data)
  })
}

exports.debugLog = function (ctx) {
  console.log(`ctx.request.body`, JSON.stringify(ctx.request.body))
  console.log(`ctx.req.headers`, JSON.stringify(ctx.req.headers))
}

exports.readFile = function (src) {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
