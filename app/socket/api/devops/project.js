/**
 * Created by ken on 2017/5/4.
 */
const {log} = requireRoot('app/lib/tool')
module.exports = function (socket) {
  socket.on('devops.project.index', (d) => {
    socket.emit('devops.project.index', {name:'devops.project.index'})
  })
}
