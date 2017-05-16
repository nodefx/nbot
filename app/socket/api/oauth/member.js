/**
 * Created by ken on 2017/5/4.
 */
const db = requireRoot('app/lib/database')
const {sign} = requireRoot('app/lib/jwt')
const Cls = requireRoot('app/socket/api')
module.exports = class extends Cls {
  /**
   * socket-on
   * @param data 客户端emit的数据
   * @param cat 频道名称
   * @returns {Promise.<void>}
   */
  async login(data, cat) {
    const {passport, password} = data
    let member = await db.model('member').findOneAsync({passport, password})
    if (member && member.passport) {
      delete member.password
      member.token = sign(member)
      await db.model('member').updateAsync({passport}, {$set: {updateAt: new Date()}}, {})
      this.success(cat, member, '登陆成功')
    } else {
      this.error(cat, {}, '登陆失败')
    }
  }
}