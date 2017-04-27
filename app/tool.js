/**
 * Created by ken on 2017/4/27.
 */
const {spawn} = require('child_process')
const colors = require('colors/safe')
exports.cmd = function (action, args = [], stdout, stderr) {
  let child = spawn(action, args)
  child.stdout.on('data', (data) => {
    console.log(colors.blue(`跟踪: ${data}`));
    stdout && stdout(data)
  });

  child.stderr.on('data', (data) => {
    console.log(colors.yellow(`警告: ${data}`));
    stderr && stderr(data)
  });
}