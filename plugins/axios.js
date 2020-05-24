import Cookies from 'js-cookie'
import api from '@/api'
// import { getToken } from '@/libs/utils'

export default ({ $axios, redirect }, inject) => {
  const createRequest = api($axios)
  // 将api字段注入到vue.prototype中，会在第一个参数前加上$符号
  inject('api', createRequest)

  $axios.onRequest((config) => {
    console.log(Cookies.get('token'))
    return config
  })
  $axios.onResponse(({ data }) => {
    if (data.status === 200) {
      return data
    } else {
      return Promise.reject(data.msg)
    }
  })
  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/')
    }
  })
}
