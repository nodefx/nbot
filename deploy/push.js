/**
 * Created by ken on 2017/4/27.
 */
const {exec} = require('child_process')
const fs = require('fs')
const path = require('path')
const packageConf = GetPackage()// 获取包配置
const gitEvent = process.argv[2] // 获取git 事件变量
function cmd(command) {
  return new Promise((resolve,reject)=>{
    const child = exec(command)
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    child.on('error', function (error) {reject(error)})
    child.on('exit', function (code) {resolve(code)})
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
  await cmd('yarn build')
  await cmd('yarn reload')
}
queue().catch(o => {
  console.error(o)
})
