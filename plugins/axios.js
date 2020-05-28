import api from '@/api'
import { getToken, getVisitorToken } from '@/libs/utils'

export default ({ $axios, redirect, store }, inject) => {
  const createRequest = api($axios)
  // 将api字段注入到vue.prototype中，会在第一个参数前加上$符号
  inject('api', createRequest)

  $axios.onRequest((config) => {
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  })
  $axios.onResponse((response) => {
    if (response.data.status === 200) {
      return response.data
    } else {
      return Promise.reject(response.data.msg)
    }
  })
  $axios.onError(({ response }) => {
    if (response.status === 401) {
      // 登录失效
      // 如果是游客自动登录
      console.log('登录失效')
      console.log(getVisitorToken())
      if (store.state.user.role[0].id === 2) {
        store.dispatch('visitorLogin')
      } else {
        // 用户退出登录
        store.dispatch('logout')
      }
      return Promise.reject(new Error('登录失效'))
    }
    // if (error.response.status === 500) {
    //   redirect('/')
    // }
  })
}
