import React from 'react'
import {Router, browserHistory,hashHistory} from 'react-router'
import createRoutes from 'route/index'
import {Provider} from 'mobx-react'
import {store} from 'store/index'
import DevTools from 'mobx-react-devtools'
const routes = createRoutes()
export default class App extends React.Component {
  render() {
    const devTool = (process.env.NODE_ENV !== 'production') && <DevTools />
    return (
      <Provider {...store}>
        <div>
          <Router history={hashHistory} routes={routes}></Router>
          {devTool}
        </div>
      </Provider>

    )
  }
}
