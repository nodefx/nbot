/**
 * Created by ken on 2017/4/27.
 */
const {spawn} = require('child_process')
const cmd = function (action, args = []) {
  let err, suc = ''
  return new Promise((resolve, reject) => {
    let child = spawn(action, args)
    child.stdout.on('data', (data) => {
      if (data) suc += data
    });

    child.stderr.on('data', (data) => {
      if (data) err += data
    });

    child.on('exit', function (code) {
      if (code != 0) {
        console.log('Failed: ' + code);
      }
      if (err){
        console.error(err)
        return reject(err)
      }
      console.log(suc)
      return resolve(suc)
    });
  })
}
const gitEvent = process.argv[2]


async function queue() {
  try {
    await cmd('git',['pull'])
    await cmd('yarn',['reload'])
  } catch (e) {
    console.error(e.message)
  }
}
queue().then()

