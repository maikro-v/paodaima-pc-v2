import Api from './Api'
export default class Comment {
  constructor(http) {
    this.http = new Api(http)
    this.base = '/api/comment'
  }

  page(data) {
    return this.http.page(`${this.base}/page`, data)
  }

  add(data) {
    return this.http.add(this.base, data)
  }
}
