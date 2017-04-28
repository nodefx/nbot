/**
 * Created by ken on 2017/4/26.
 */
const Koa = require('koa')
const koaStatic = require('koa-static')
const koaCompress = require('koa-compress')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
const platform = require('./platform/index')
const db = require('./lib/database')
const tool = require('./lib/tool')
const app = new Koa()
const webpath = config.app.path.root + '/web/build'
app.use(koaStatic(webpath))
app.use(koaCompress())
app.use(bodyParser())
// response
app.use(async(ctx) => {
  const check = await platform(ctx.req.headers, ctx.request.query, ctx.request.body)
  tool.debugLog(ctx)
  // let d = await db.model('push').findAsync({})
  if (check !== false)return ctx.body = {success: true}
  tool.log.debug(`${webpath}/index.html`)
  ctx.body = await tool.readFile(`${webpath}/index.html`)
})

app.listen(config.http.port)
module.exports = app
