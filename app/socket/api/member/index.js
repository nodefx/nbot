/**
 * Created by ken on 2017/5/15.
 */
const db = requireRoot('app/lib/database')

const Cls = requireRoot('app/socket/api')

module.exports = class extends Cls{

  async list(data,cat){
    let members = await db.model('member').findAsync({})
    members.map((v) => {
      v.updateAt = moment(v.updateAt).fromNow()
      v.createAt = moment(v.createAt).fromNow()
    })
    this.success(cat,members)
  }
}