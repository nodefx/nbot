/**
 * Created by ken on 2017/5/4.
 */
const {log} = requireRoot('app/lib/tool')
module.exports = function (socket) {
  socket.emit('project', {connetion: true})
}
