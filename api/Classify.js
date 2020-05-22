import Request from './Request'
export default class Classify extends Request {
  constructor(http) {
    super(http)
  }

  list(data) {
    return this.request({
      url: '/api/classify',
      method: 'get',
      data
    })
  }
}
