/**
 * Created by ken on 2017/4/27.
 */
const {exec} = require('child_process')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const packageConf = GetPackage()// 获取包配置
const gitEvent = process.argv[2] // 获取git 事件变量
function cmd(command) {
  return new Promise((resolve, reject) => {
    const child = exec(command)
    const rl = readline.createInterface(child.stdout, child.stdin)
    rl.on('line', (d) => {
      console.log(d);
      listenChangeLine(d)
    })
    child.on('error', function (error) {
      reject(error)
    })
    child.on('exit', function (code) {
      resolve(code)
    })
  })
}
function GetPackage() {
  let conf = fs.readFileSync(path.join(path.dirname(__dirname), 'package.json'))
  return conf && JSON.stringify(conf.toString()) || ''
}
//更新选项
let isUpdatePackage = false
let isUpdateWeb = false
function listenChangeLine(d) {
  if (d.indexOf('package.json') > -1) {
    isUpdatePackage = true
  }
  if (d.indexOf('web/src') > -1) {
    isUpdateWeb = true
  }
}

async function queue() {
  await cmd('git pull')
  if (isUpdatePackage) await cmd('yarn')
  if (isUpdateWeb) await cmd('yarn build')
  await cmd('yarn reload')
}
queue().catch(o => {
  console.error(o)
})
