module.exports = (app, config) => {
  const webpack = require('webpack')
  const webpackConfig = require(`${config.app.path.root}/web/webpack.config.js`)('development')
  const compiler = webpack(webpackConfig)

  const WebpackDevServer = require('webpack-dev-server')
  var server = new WebpackDevServer({config:webpackConfig})
  server.listen(1355)
}