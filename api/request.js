import Api from './api'

export default class Request extends Api {
  constrcutor (http, options) {
    super(http)
    this.base = options.base
  }

  list (url, data) {
    return this.requestGet(url, data)
  }
}
