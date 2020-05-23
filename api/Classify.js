import Api from './Api'
export default class Classify {
  constructor(http) {
    this.http = new Api(http)
    this.base = '/api/classify'
  }

  list(data) {
    return this.http.list(`${this.base}`, data)
  }
}
