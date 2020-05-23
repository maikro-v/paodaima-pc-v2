export default class Request {
  constructor(http) {
    this.http = http
  }

  request(options) {
    return new Promise((resolve, reject) => {
      const { url, method = 'get', data, header = {} } = options
      const requestMethod = method.toLowerCase()
      if (requestMethod !== 'get' && requestMethod !== 'post' && requestMethod !== 'delete' && requestMethod !== 'put') {
        return reject(new Error('非法的method参数，method需在get,post,delete,put范围内'))
      }
      if (requestMethod === 'get' || requestMethod === 'delete') {
        return this.get(url, data, header).then(resolve).catch(reject)
      } else if (requestMethod === 'post' || requestMethod === 'put') {
        return this.post(url, data, header).then(resolve).catch(reject)
      } else {
        return reject(new Error('非法的method参数，method需在get,post,delete,put范围内'))
      }
    })
  }

  get(url, data, header) {
    return this.http.get(url, { params: data, header })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err))
  }

  post(url, data, header) {
    return this.http.post(url, data, header)
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err))
  }
}
