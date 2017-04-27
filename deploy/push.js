/**
 * Created by ken on 2017/4/27.
 */
const {exec} = require('child_process')
const gitEvent = process.argv[2]
const cmd = function (...arg) {
  return new Promise((resolve, reject) => {
    exec(...arg, function (e, o, oe) {
      if (e){
        return reject(e)
      }
      else if(oe){
        return reject(oe)
      }
      else if(o){
        console.log(o)
        return resolve(o)
      }
    })
  })
}

async function queue() {
  try {
    await cmd('git pull')
    await cmd('yarn reload')
  }catch (e){
    console.error(e)
  }
}
queue().then()