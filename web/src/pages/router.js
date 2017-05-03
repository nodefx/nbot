import main from 'pages/main'
import nomatch from 'pages/nomatch'
function errorLoading(cb) {
  return (err) => {
    console.error(err)
    cb(null, nomatch)
  }
}

function loadRoute(location, cb, key) {
  return (module) => cb(null, module.default)
}

export const loadComponent = function (defaultKey = false) {
  return function (location, cb) {
    let key = defaultKey
    if (!key) {
      key = `${location.params.module}/${location.params.controller}`
      if (location.params.action) {
        key = `${key}/${location.params.action}`
      }
    }
    System.import(`pages/${key}/index.js`).then(loadRoute(location, cb, key)).catch(errorLoading(cb))
  }
}
export default function createRoutes() {
  return {
    path: '/',
    component: main,
    indexRoute: {
      getComponent: loadComponent('home/index')
    },
    childRoutes: [
      // 使用到公共模块的时候用到
      {
        path: ':module/:controller', getComponent: loadComponent()
      },
      // 独立子页面
      {
        path: ':module/:controller/:action', getComponent: loadComponent()
      },
      {path: '*', component: nomatch}
    ]
  }
}
