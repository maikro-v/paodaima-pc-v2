import Request from './Request'
export default class Api extends Request {
  constructor(http) {
    super(http)
    this.pageOptions = {
      page: 1,
      limit: 10
    }
  }

  /**
   * 分页
   */
  page(url, data) {
    if (data) {
      data = { ...this.pageOptions, ...data }
    } else {
      data = this.pageOptions
    }
    return this.request({
      url,
      method: 'get',
      data
    })
  }

  /**
   * 列表
   */
  list(url, data) {
    return this.request({
      url,
      method: 'get',
      data
    })
  }

  /**
   * 详情
   */
  detail() {}

  /**
   * 添加
   */
  add() {}

  /**
   * 更新
   */
  update() {}

  /**
   * 删除
   */
  remove() {}
}
