/**
 * Created by ken on 2017/5/12.
 */
import localstorage from 'plugin/localstorage'
export const whiteList = ['/oauth/login']
export default function (nextState, replaceState, callback) {
  if (whiteList.indexOf(nextState.location.pathname) === -1 && !isMember()) {
    replaceState({nextPathname: nextState.location.pathname}, '/oauth/login')
  }else if(whiteList.indexOf(nextState.location.pathname) > -1 && isMember()){
    replaceState({nextPathname: nextState.location.pathname}, '/')
  }
  callback()

}

function isMember() {
  const member = localstorage.get('member')
  return (Object.keys(member).length > 0)
}

