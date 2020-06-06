import Cookies from 'js-cookie'
const TOKEN = 'token'

export function setToken(val) {
  // 设置的是数字，过期时间以天为单位，如果需要更小的单位，可以用Date实例
  Cookies.set(TOKEN, val, { expires: 0.5 })
  // window.localStorage.setItem(TOKEN, val)
}

export function getToken() {
  return Cookies.get(TOKEN)
}

export function removeToken() {
  Cookies.remove(TOKEN)
}

// 设置游客token
export function setVisitorToken(val) {
  window.localStorage.setItem(TOKEN, val)
}

// 获取游客token
export function getVisitorToken() {
  return window.localStorage.getItem(TOKEN)
}

// 获取request的cookie
export function getCookieFromReq(req, name) {
  if (!req.headers.cookie) {
    return
  }
  const valCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${name}=`))
  if (!valCookie) {
    return
  }
  return decodeURIComponent(valCookie.split('=')[1])
}
