/**
 * Created by ken on 2017/4/27.
 */
const {exec} = require('child_process')
const fs = require('fs')
const path = require('path')
const packageConf = GetPackage()// 获取包配置
const gitEvent = process.argv[2] // 获取git 事件变量
function cmd(command) {
  return new Promise((resolve, reject) => {
    exec(command, function (e, o, oe) {
      if (e) {
        return reject(e)
      } else if (oe) {
        return resolve(oe)
      } else if (o) {
        return resolve(o)
      }
    })
  }).then(o => {
    console.log(`${__filename} ${command} ${o}`)
  }).catch(o => {
    console.error(`${__filename} ${command} ${o}`)
  })
}
function GetPackage() {
  let conf = fs.readFileSync(path.join(path.dirname(__dirname), 'package.json'))
  return conf && JSON.stringify(conf.toString()) || ''
}

async function queue() {
  await cmd('git pull')
  const newConf = GetPackage()
  if (newConf !== packageConf) {
    await cmd('yarn')
  }
  await cmd('yarn reload')
}
queue().catch(o => {
  console.error(o)
})
