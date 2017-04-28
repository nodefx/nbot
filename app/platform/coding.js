/**
 * Created by ken on 2017/4/26.
 */
const fs = require('fs')
const db = require('../lib/database')
const {cmd} = require('../lib/tool')

module.exports = async function (header = {}, get = {}, post = {}) {
  let gitEvent = Object.assign({}, header, get, post)
  switch (header['x-coding-event']) {
    case 'push':
      await gitpush(gitEvent)
      break
  }
}

async function gitpush(gitEvent) {
  if (!fs.existsSync(`${gitEvent.path}/deploy/push.js`)) return
  // await db.model('push').insertAsync(gitEvent)
  cmd(`node`, [`${gitEvent.path}/deploy/push.js`, `'${JSON.stringify(gitEvent)}'`])
}
