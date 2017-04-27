/**
 * Created by ken on 2017/4/26.
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const config = require('./config')
const app = new Koa()
app.use(bodyParser());
// response
app.use(ctx => {
  ctx.body = 'devops webhook!'
  console.log(ctx.request.header)
  console.log(ctx.request.query)
  console.log(ctx.request.body)
})

app.listen(config.http.port)

module.exports = app
