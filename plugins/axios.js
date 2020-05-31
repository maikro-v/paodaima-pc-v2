import api from '@/api'
import { getToken, getVisitorToken, setVisitorToken } from '@/libs/utils'

export default ({ $axios, redirect, store, app }, inject) => {
  const isClient = process.client // 是否客户端环境
  const createRequest = api($axios)
  // 将api字段注入到vue.prototype中，会在第一个参数前加上$符号
  inject('api', createRequest)

  $axios.onRequest((config) => {
    if (getToken()) {
      config.headers.Authorization = getToken()
    } else if (isClient && getVisitorToken()) { // 服务端没有window对象，无法操作loacaStorage
      config.headers.Authorization = getVisitorToken()
    }
    return config
  })
  $axios.onResponse((response) => {
    if (response.data.status === 200) {
      return response.data
    } else {
      return Promise.reject(response)
    }
  })
  $axios.onError(({ response, data }) => {
    if (response.status === 401) {
      if (getToken()) {
        // 用户身份登录失效
        store.dispatch('logout')
        return Promise.resolve(data)
      } else {
        // 游客身份登录失效，自动登录
        return app.$api.user.visitorLogin().then(({ data }) => {
          setVisitorToken(data)
          return Promise.resolve(data)
        }).catch((err) => {
          return Promise.reject(err)
        })
      }
    } else if (data.status === 400) {
      return Promise.reject(data.msg)
    } else {
      redirect('/')
    }
  })
}
