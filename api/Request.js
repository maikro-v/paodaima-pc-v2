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
        return this.http[requestMethod](url, { params: data, header }).then(resolve).catch(reject)
      } else if (requestMethod === 'post' || requestMethod === 'put') {
        return this.http[requestMethod](url, data, header).then(resolve).catch(reject)
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

  delete(url, data, header) {
    return this.http.delete(url, { params: data, header })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err))
  }

  post(url, data, header) {
    return this.http.post(url, data, header)
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err))
  }

  put(url, data, header) {
    return this.http.put(url, data, header)
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err))
  }
}
