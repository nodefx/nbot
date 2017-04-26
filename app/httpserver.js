/**
 * Created by ken on 2017/4/26.
 */
const Koa = require('koa')
const config = require('./config')
const app = new Koa()

// response
app.use(ctx => {
  ctx.body = 'Hello Koa'
})

app.listen(config.http.port)

module.exports = app
