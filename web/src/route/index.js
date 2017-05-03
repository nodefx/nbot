import main from 'components/main'
import nomatch from 'components/nomatch'
function errorLoading(err) {
  console.error('找不到响应模块', err);
  return () => cb(null, nomatch);
}

function loadRoute(location, cb, key) {
  return (module) => cb(null, module.default);
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
    System.import(`pages/${key}.js`).then(loadRoute(location, cb, key)).catch(errorLoading)
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
