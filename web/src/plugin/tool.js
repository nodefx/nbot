import store from 'store';
/**
 * 代理层/域/java-api路径
 * [/agent][/storeapi][/api/ticket/ticketRule/query]
 */
export const proxyJava = function(url,domain){
  return `https://napi.mazing.com/agent/${domain}${url}`
}

/**
 * 深拷贝 ::TODO 只处理的原型链 需要深度复制算法
 * @param d
 */
export const deepCopy = function(d){
  return JSON.parse(JSON.stringify(d))
}

/**
 * 根据相对路径获取绝对路径
 * @param url
 * @returns {*}
 */
export const mzImg = function(url){
  if(!url)return ''
  return 'https://img.mazing.com/'+url
}
/**
 * 防止重复注册功能
 * @param name
 * @param storeModule
 */
export const storeRegister = function(name,storeModule){
  if(!store.state[name]){
    store.registerModule(name,storeModule)
  }
}