/**
 * Created by saa on 2017/5/4.
 */
const nodessh = require('node-ssh');
const ssh = new nodessh();
async function test() {
  await ssh.connect({
    host: '121.43.155.222',
    port: 9022,
    username: 'saa',
    privateKey: 'C:/Code/ssh-key/saa_rsa'
  })
  let res = await ssh.exec('rsync -avzrutS4P --progress --delete /home/saa/.ssh /home/saa/ssshhh');
  console.log(res)
}
test();
