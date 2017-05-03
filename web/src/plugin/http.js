/**
 * Created by ken on 2016/12/13.
 */
import axios from 'axios'
import localstorage from 'plugin/localstorage'
import qs from 'qs'
axios.defaults.baseURL = 'https://napi.mazing.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(function (config) {
  // 设置token
  let token = localstorage.get('mz_member_token') || false
  if (!token) {
    config.headers.token = ''
  } else {
    config.headers.token = token
  }
  // 语言包设置
  // config.headers.lang = 'en'
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 设置token
  if (response.headers.token) {
    localstorage.set('mz_member_token', response.headers.token)
  }
  // code等于80时,重新登录
  if (response.data.code == 80) {
    localstorage.remove('mz_member_token')
    localstorage.remove('mz_member')
    window.location.href = '/oauth/login'
  }
  return response
}, function (error) {
  // 过期重新登录
  let data = error.response.data || {}
  if (data.code == -10) {
    localstorage.remove('mz_member_token')
    localstorage.remove('mz_member')
    window.location.href = '/oauth/login'
  }
  return Promise.reject(error)
})

export default {
  request: axios.request,
  get: function (url, map) {
    return axios.get(url, {params: map})
  },
  delete: function (url, map) {
    return axios.delete(url, {params: map})
  },
  head: axios.head,
  post: function (url, map) {
    return axios.post(url, qs.stringify(map))
  },
  put: function (url, map) {
    return axios.put(url, qs.stringify(map))
  },
  patch: function (url, map) {
    return axios.patch(url, qs.stringify(map))
  }
}
