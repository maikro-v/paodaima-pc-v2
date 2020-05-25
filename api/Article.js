import Api from './Api'
export default class Article {
  constructor(http) {
    this.http = new Api(http)
    this.base = '/api/article'
  }

  // 分页
  page(data) {
    return this.http.page(`${this.base}/page`, data)
  }

  // 热门
  hot(data) {
    return this.http.page(`${this.base}/hot`, data)
  }

  // 详情
  detail(data) {
    return this.http.detail(this.base, data)
  }
}
