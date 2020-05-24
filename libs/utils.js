import Cookies from 'js-cookie'
const TOKEN = 'token'

export function setToken(val) {
  // 设置的是数字，过期时间以天为单位，如果需要更小的单位，可以用Date实例
  Cookies.set(TOKEN, val, { expires: 0.5 })
  window.localStorage.setItem(TOKEN, val)
}

export function getToken() {
  return Cookies.get(TOKEN)
}
