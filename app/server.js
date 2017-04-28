/**
 * Created by ken on 2017/4/26.
 */
const Koa = require('koa')
const koaStatic = require('koa-static')
const koaCompress = require('koa-compress')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
const platform = require('./platform/index')
const {readFile} = require('./lib/tool')
const app = new Koa()
const webpath = config.app.path.root + '/web/build'
app.use(koaStatic(webpath))
app.use(koaCompress())
app.use(bodyParser())
// response
app.use(async(ctx) => {
  if (await platform(ctx.req.headers, ctx.request.query, ctx.request.body)) {
    ctx.body = {success: true}
  } else {
    ctx.body = await readFile(`${webpath}/index.html`)
  }
})

app.listen(config.http.port)
module.exports = app
