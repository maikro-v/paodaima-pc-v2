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

  // 相关推荐
  recommend(data) {
    return this.http.get(`${this.base}/recommend`, data)
  }

  // 增加访客
  addVisitor(data) {
    return this.http.post(`${this.base}/visitor`, data)
  }
}
