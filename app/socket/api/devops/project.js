/**
 * Created by ken on 2017/5/4.
 */
const {log} = requireRoot('app/lib/tool')
module.exports = class {
  constructor(socket) {
    socket.lset('devops.project.index', {name: 'devops.project.index'})
  }
}
