export default class Api {
  constructor (http) {
    this.http = http
  }

  request (options) {
    return new Promise((resolve, reject) => {
      const { url, method = 'get', data, header = {} } = options
      const requestMethod = method.toLowerCase()
      if (requestMethod !== 'get' || requestMethod !== 'post' || requestMethod !== 'delete' || requestMethod !== 'put') {
        return reject(new Error('非法的method参数，method需在get,post,delete,put范围内'))
      }
      if (requestMethod === 'get' || requestMethod === 'delete') {
        return this.requestGet(url, data, header)
      } else if (requestMethod === 'post' || requestMethod === 'put') {
        return this.requestPost(url, data, header)
      }
    })
  }

  requestGet (url, data, header) {
    return this.http.get(url, { params: data, header })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err))
  }

  requestPost (url, data, header) {
    return this.http.post(url, data, header)
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err))
  }
}
