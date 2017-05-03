/**
 * Created by ken on 2017/5/3.
 * tail -f -n 200 data/access.log
 */
const conf = require('./config')
const accessPath = `${conf.app.path.root}/data/access.log`

const Tail = require('always-tail')
const tail = new Tail(accessPath, '\n', {start: 0, interval: 1000})

tail.on('line', function(data) {
  console.log(data)
})

tail.on('error', function(data) {
  console.log(data)
})
