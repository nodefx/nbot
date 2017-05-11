/**
 * Created by ken on 2017/5/4.
 */
const db = requireRoot('app/lib/database')
const {sign} = requireRoot('app/socket/bootstrap/jwt')
module.exports = function (socket) {


  socket.on('oauth.member.login',async(d)=>{
    const {passport,password} = d
    let member = await db.model('member').findOneAsync({passport,password})
    if(member&&member.passport){
      delete member.password
      member.token = sign(member)
      socket.emit('oauth.member.login',{code:0,msg:'登陆成功',data:member})
    }else{
      socket.emit('oauth.member.login',{code:1,msg:'登陆失败',data:{}})
    }
  })
}