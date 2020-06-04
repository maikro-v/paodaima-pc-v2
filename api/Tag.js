import Api from './Api'
export default class Tag {
  constructor(http) {
    this.http = new Api(http)
    this.base = '/api/tag'
  }

  list(data) {
    return this.http.list(`${this.base}`, data)
  }

  add(data) {
    return this.http.add(`${this.base}`, data)
  }
}
