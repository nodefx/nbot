/**
 * Created by ken on 2017/4/26.
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const config = require('./config')
const platform = require('./platform/index')
const db = require('./database')
const app = new Koa()
app.use(bodyParser());
// response
app.use(async(ctx) => {
  await platform(ctx.req.headers,ctx.request.query,ctx.request.body)
  let d = await db.model('push').findAsync({})
  ctx.body =d||{}
})

app.listen(config.http.port)

module.exports = app
