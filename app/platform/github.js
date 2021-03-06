/**
 * Created by ken on 2017/4/27.
 */
const fs = require('fs')
const db = require('../lib/database')
const {cmd} = require('../lib/tool')

module.exports = async function (gitEvent) {
  switch (gitEvent['x-github-event']) {
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
