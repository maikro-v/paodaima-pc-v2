import Api from './Api'
export default class Upload {
  constructor(http) {
    this.http = new Api(http)
    this.base = '/api/upload'
  }

  upload(data) {
    return this.http.post(`${this.base}`, data)
  }

  uploadBase(data) {
    return this.http.post(`${this.base}/base`, data)
  }
}
