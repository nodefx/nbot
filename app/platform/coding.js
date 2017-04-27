/**
 * Created by ken on 2017/4/26.
 */
const fs = require('fs')
const db = require('../database')
const {cmd} = require('../tool')

module.exports = async function (header = {}, get = {}, post = {}) {
  let gitEvent = Object.assign({}, header, get, post)
  switch (gitEvent.event) {
    case 'push':
      await gitpush(gitEvent)
      break
  }
}

async function gitpush(gitEvent) {
  console.log('fs.existsSync(`${gitEvent.path}/deploy/push.js`)',fs.existsSync(`${gitEvent.path}/deploy/push.js`))
  if (fs.existsSync(`${gitEvent.path}/deploy/push.js`)) return
  await db.model('push').insertAsync(gitEvent)
  cmd(`node`, [`${gitEvent.path}/deploy/push.js`, `'${JSON.stringify(gitEvent)}'`])
}