import Api from './Api'
export default class User {
  constructor(http) {
    this.http = new Api(http)
    this.base = '/api/user'
  }

  // 登录
  login(data) {
    return this.http.post(`${this.base}/login`, data)
  }

  // 游客登录
  visitorLogin(data) {
    return this.http.post(`${this.base}/visitorLogin`, data)
  }

  // 用户信息
  userInfo(data) {
    return this.http.get(`${this.base}/userInfo`, data)
  }
}
