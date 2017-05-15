/**
 * Created by ken on 2017/5/15.
 */
const db = requireRoot('app/lib/database')
const moment = require('moment')
moment.locale('zh-cn')
module.exports = function (socket) {


  socket.on('member.index.list',async(d)=>{
    let members = await db.model('member').findAsync({})
    members.map((v)=>{
      v.updateAt = moment(v.updateAt).fromNow()
      v.createAt = moment(v.createAt).fromNow()
    })
    socket.emit('member.index.list',{code:0,msg:'',data:members})
  })
}