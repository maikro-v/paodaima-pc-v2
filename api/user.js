import http from '~/libs/Axios/Axios.request'

export const login = (p) => {
  return http.request({
    url: '/api/user/login',
    method: 'post',
    data: p
  })
}

/**
 * 游客登录
 */
export const visitorLogin = (p) => {
  return http.request({
    url: '/api/user/visitorLogin',
    method: 'post',
    data: p
  })
}

export const register = (p) => {
  return http.request({
    url: '/api/user/register',
    method: 'post',
    data: p
  })
}

export const userInfo = (p) => {
  return http.request({
    url: '/api/user/userInfo',
    method: 'get',
    data: p
  })
}
