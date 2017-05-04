import React from 'react'
import {Router, browserHistory} from 'react-router'
import createRoutes from 'pages/router'
import {store} from 'store/index'
import Provider from './Provider'
import DevTools from 'mobx-react-devtools'
const routes = createRoutes()
export default class App extends React.Component {
  render() {
    const devTool = (process.env.NODE_ENV !== 'production') && <DevTools />
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} routes={routes}></Router>
          {devTool}
        </div>
      </Provider>

    )
  }
}
