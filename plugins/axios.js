import api from '@/api'
import { getToken, setToken } from '@/libs/utils'

export default ({ $axios, redirect }, inject) => {
  const createRequest = api($axios)
  // 将api字段注入到vue.prototype中，会在第一个参数前加上$符号
  inject('api', createRequest)

  $axios.onRequest((config) => {
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  })
  $axios.onResponse(({ data }) => {
    if (data.status === 200) {
      return data
    } else if (data.status === 401) {
      // 登录失效
      setToken(null)
      return Promise.reject(new Error('登录失效'))
    } else {
      return Promise.reject(data.msg)
    }
  })
  // $axios.onError((error) => {
  //   console.log(error)
  //   if (error.response.status === 500) {
  //     redirect('/')
  //   }
  // })
}
