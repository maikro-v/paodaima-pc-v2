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

  // 推荐的文章
  recommend(data) {
    return this.http.get(`${this.base}/recommend`, data)
  }

  // 相关文章
  similar(data) {
    return this.http.get(`${this.base}/similar`, data)
  }

  // 增加访客
  addVisitor(data) {
    return this.http.post(`${this.base}/visitor`, data)
  }

  // 增加文章
  add(data) {
    return this.http.post(`${this.base}`, data)
  }

  // 删除文章
  remove(id) {
    return this.http.delete(`${this.base}/${id}`)
  }

  // 修改文章
  update(data) {
    return this.http.put(this.base, data)
  }

  // 点赞文章
  like(data) {
    return this.http.post(`${this.base}/like`, data)
  }
}
