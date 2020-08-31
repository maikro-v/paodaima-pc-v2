import Api from './Api'
export default class Comment {
  constructor(http) {
    this.http = new Api(http)
    this.base = '/api/v2/comment'
  }

  list(data) {
    return this.http.get(`${this.base}`, data)
  }

  add(data) {
    return this.http.add(this.base, data)
  }
}
