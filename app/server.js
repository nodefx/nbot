/**
 * Created by ken on 2017/4/26.
 */
const Koa = require('koa')
const statics = require('koa-static')
const compress = require('koa-compress')
const bodyParser = require('koa-bodyparser')
const favicon = require('koa-favicon')
const config = require('./config')
const platform = require('./platform/index')
const {readFile} = require('./lib/tool')
const app = new Koa()
const webpath = config.app.path.root + '/web/build'
app.use(statics(webpath))
app.use(compress())
app.use(bodyParser())
app.use(favicon())
// response
app.use(async(ctx) => {
  if (await platform(ctx.req.headers, ctx.request.query, ctx.request.body)) {
    ctx.body = {success: true}
  } else {
    ctx.body = await readFile(`${webpath}/index.html`)
  }
})
//
const server = app.listen(config.http.port, () => {
  console.log(`listen port : ${config.http.port}`)
})
app.on('error', err => {
  console.log(`listen error : ${err.message}`)
  process.exit(1)
})
//
module.exports = app
//  启动 websocket 服务
require('./socket/index')(server)
