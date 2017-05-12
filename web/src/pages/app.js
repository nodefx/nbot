import React from 'react'
import {Router, browserHistory} from 'react-router'
import createRoutes from 'pages/router'
import {appStore,Provider} from 'store/index'
import DevTools from 'mobx-react-devtools'
const routes = createRoutes()
//注册全局store
appStore.register('common/menu')
appStore.register('common/member')
//
export default class App extends React.Component {
  render() {
    const devTool = (process.env.NODE_ENV !== 'production') && <DevTools />
    return (
      <Provider appStore={appStore}>
        <div>
          <Router history={browserHistory} routes={routes}></Router>
          {devTool}
        </div>
      </Provider>

    )
  }
}
