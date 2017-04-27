/**
 * Created by ken on 2017/4/27.
 */
const {exec} = require('child_process')
const gitEvent = process.argv[2]
const cmd = function (command) {
  return new Promise((resolve, reject) => {
    exec(command, function (e, o, oe) {
      if (e) {
        return reject(e)
      }
      else if (oe) {
        return resolve(oe)
      }
      else if (o) {
        return resolve(o)
      }
    })
  }).then(o => console.log(__dirname, command, o)).catch(e => console.error(__dirname, command, e))
}

async function queue() {
  await cmd('git pull')
  await cmd('yarn reload')
}
queue()