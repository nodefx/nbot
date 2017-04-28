/**
 * Created by ken on 2017/4/27.
 */
module.exports = async function (header, get, post) {
  console.log(JSON.stringify(header))
  if (header['user-agent'].indexOf('Coding.net') > -1) {
    await require('./coding')(header, get, post)
    return true
  } else if (header['user-agent'].indexOf('GitHub') > -1) {
    await require('./github')(header, get, post)
    return true
  }
  return false
}
