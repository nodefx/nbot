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
  //console.log(`ctx.request.body`,JSON.stringify(ctx.request.body))
  //console.log(`ctx.req.headers`,JSON.stringify(ctx.req.headers))
  await platform(ctx.req.headers,ctx.request.query,ctx.request.body)
  //let d = await db.model('push').findAsync({})
  ctx.body ='v0.2.1'
})

app.listen(config.http.port)

module.exports = app
