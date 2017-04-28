import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import 'antd/dist/antd.less'
import App from 'components/app'
import socketIo from 'plugin/socket'
socketIo()

const render = Component => {
  ReactDOM.render(
    <AppContainer key={Math.random()}>{/*防止开发的时候热更不成功 增加 Math.random */}
      <Component />
    </AppContainer>,
    document.getElementById('App')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('components/app', () => {
    console.log('hot reload', Date.now(), process.env.NODE_ENV)
    render(App)
  })
}


