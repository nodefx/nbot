/**
 * Created by ken on 2017/4/27.
 */
const colors = require('colors/safe')
exports.cmd = function (action, args = [], stdout, stderr) {
  const {spawn} = require('child_process')
  let child = spawn(action, args)
  child.stdout.on('data', (data) => {
    console.log(colors.blue(`跟踪: ${data}`));
    stdout && stdout(data)
  });

  child.stderr.on('data', (data) => {
    console.log(colors.red(`错误: ${data}`));
    stderr && stderr(data)
  });
}