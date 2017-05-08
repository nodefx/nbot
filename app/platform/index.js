/**
 * Created by ken on 2017/4/27.
 */
module.exports = async function (header, get, post) {
  let gitEvent = Object.assign({}, header, get, post)
  console.log(__dirname,'gitEvent',JSON.stringify(gitEvent))
  if (header['user-agent'].indexOf('Coding.net') > -1) {
    await require('./coding')(gitEvent)
    return true
  } else if (header['user-agent'].indexOf('GitHub') > -1) {
    await require('./github')(gitEvent)
    return true
  }
  return false
}
