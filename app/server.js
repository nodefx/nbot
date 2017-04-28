/**
 * Created by ken on 2017/4/26.
 */
const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
const packageConf = require('../package.json')
const platform = require('./platform/index')
const db = require('./lib/database')
const tool = require('./lib/tool')
const app = new Koa()
app.use(koaStatic(__dirname + '/web'))
app.use(bodyParser())
// response
app.use(async(ctx) => {
  const check = await platform(ctx.req.headers, ctx.request.query, ctx.request.body)
  // tool.debugLog(ctx)
  // let d = await db.model('push').findAsync({})
  if (check !== false) {
    return ctx.body = {success: true}
  }
  return ctx.body = `node devops ${packageConf.version}`
})

app.listen(config.http.port)

module.exports = app
