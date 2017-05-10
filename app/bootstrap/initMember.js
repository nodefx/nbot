/**
 * Created by ken on 2017/5/11.
 */
const db = require('../lib/database')
module.exports = async function (conf) {

  let member = await db.model('member').countAsync({})
  if (member === 0) {

    await db.model('member').insertAsync({
      passport: 'admin',
      password: 'admin',
      role: 1,
      createAt: new Date(),
      updateAt: new Date()
    })
  }
}