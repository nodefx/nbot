/**
 * Created by ken on 2017/4/26.
 */
const db = require('../database')
const {exec,spawn} = require('child_process')
module.exports = async function(header={},get={},post={}){
  let gitEvent = Object.assign({},header,get,post)
  switch (gitEvent.event){
    case 'push':
      await gitpush(gitEvent)
      break
  }
}

async function gitpush(gitEvent){
  await db.model('push').insertAsync(gitEvent)
  //exec(`node ${gitEvent.path}/deploy/push.js '${JSON.stringify(gitEvent)}'`)
  let child = spawn(`node`, [`${gitEvent.path}/deploy/push.js`,`'${JSON.stringify(gitEvent)}'`]);
  child.stdout.on('data', function (buffer) {
    const d = buffer.toString()
    console.log(d)
  });
  child.stdout.on('end', function () {

  });
}