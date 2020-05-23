import Api from './Api'
export default class Article {
  constructor(http) {
    this.http = new Api(http)
    this.base = '/api/article'
  }

  page(data) {
    return this.http.page(`${this.base}/page`, data)
  }

  hot(data) {
    return this.http.page(`${this.base}/hot`, data)
  }
}
