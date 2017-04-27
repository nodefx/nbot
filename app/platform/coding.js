/**
 * Created by ken on 2017/4/26.
 */
const db = require('../database')
module.exports = async function(header={},get={},post={}){
  let gitEvent = {
    ...header,
    ...get,
    ...post
  }
  if(gitEvent.event==='push'){
    await db.model('push').insertAsync(gitEvent)
  }
}