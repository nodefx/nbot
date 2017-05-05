/**
 * Created by ken on 2017/4/26.
 */
// bootstrap
// ::TODO 监听文件夹里的所有文件
require('./bootstrap/global')()
// 启动 server 服务
const Koa = require('koa')
const statics = require('koa-static')
const compress = require('koa-compress')
const bodyParser = require('koa-bodyparser')
const favicon = require('koa-favicon')
const config = requireRoot('app/config')
const platform = requireRoot('app/platform/index')
const {readFile} = requireRoot('app/lib/tool')
const app = new Koa()
const webpath = config.app.path.root + '/web/build'
app.use(statics(webpath))
app.use(compress())
app.use(bodyParser())
app.use(favicon())
// response
app.use(async(ctx, next) => {
  if (await platform(ctx.req.headers, ctx.request.query, ctx.request.body)) {
    return ctx.body = {success: true}
  }
  await next()
})
/**
 * process.env.NODE_ENV
 */
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackConfig = require(`${config.app.path.root}/web/webpack.config.js`)('development')
  const compiler = webpack(webpackConfig)


  app.use(require('koa-webpack')({compiler}))

} else {
  app.use(async(ctx) => {
    ctx.body = await readFile(`${webpath}/index.html`)
  })
}
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
requireRoot('app/socket/index')(server)
