/**
 * Created by ken on 2017/4/27.
 */
module.exports = async function(header,get,post){
  switch (header['user-agent']){
    case 'Coding.net Hook':
      await require('./coding')(header,get,post)
      break
    default:
      break
  }
  return
}