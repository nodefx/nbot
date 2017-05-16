/**
 * Created by ken on 2017/5/15.
 */
const db = requireRoot('app/lib/database')
const {log} = requireRoot('app/lib/tool')
const Cls = requireRoot('app/socket/api')

module.exports = class extends Cls {

  async list(data, cat) {
    let members = await db.model('member').findAsync({})
    members.map((v) => {
      v.updateTxt = moment(v.updateAt).fromNow()
      v.createTxt = moment(v.createAt).fromNow()
    })
    this.success(cat, members)
  }

  async update(data, cat) {
    if (data._id) {
      let member = await db.model('member').findOneAsync({_id: data._id})
      if (data.passport && member.passport !== data.passport) {
        let checkCount = await db.model('member').countAsync({passport: data.passport})
        if (checkCount)return this.error(cat, {}, '用户账号不能重复')
      }
      if (member._id) {
        await db.model('member').updateAsync({_id: member._id}, {$set: data}, {})
        return this.success(cat, member, '修改成功')
      }
    }
    return this.error(cat, {}, '不存在该用户')

  }

  async add(data, cat) {
    let member = await db.model('member').findOneAsync({passport: data.passport}) || {}
    if (member._id) {
      this.error(cat, {}, '已存在该用户')
    } else {
      await db.model('member').insertAsync(data)
      this.success(cat, {}, '添加成功')
    }
  }
  async del(data, cat) {
    let member = await db.model('member').findOneAsync({_id: data.id}) || {}
    if (!member._id) {
      this.error(cat, {}, '不存在该用户')
    } else {
      await db.model('member').removeAsync({_id:data.id})
      this.success(cat, {}, '删除成功')
    }
  }
}