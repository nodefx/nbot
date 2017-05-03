import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from 'pages/app'
import socketIo from 'plugin/socket'
socketIo()

const render = Component => {
  ReactDOM.render(
    <AppContainer key={rootKeys()}>{/* 防止开发的时候热更不成功 增加 Math.random */}
      <Component />
    </AppContainer>,
    document.getElementById('App')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('pages/app', () => {
    console.log('hot reload', Date.now(), process.env.NODE_ENV)
    render(App)
  })
}

function rootKeys() {
  if (process.env.NODE_ENV === 'development') {
    return Math.random()
  } else {
    return process.env.NODE_ENV
  }
}
