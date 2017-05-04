/**
 * Created by ken on 2017/4/28.
 */
const nodessh = require('node-ssh');
const ssh = new nodessh();
const config = {
  host: '121.43.155.222',
  port: 9022,
  username: 'saa',
  privateKey: 'C:/Code/ssh-key/saa_rsa'
}
module.exports = async function (host, port, username, privateKey) {
  await ssh.connect({host, port, username, privateKey});
  return ssh;
}