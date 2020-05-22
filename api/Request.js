export default class Api {
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
        console.log('get请求')
        return this._requestGet(url, data, header).then(res => {
          console.log(res)
        })
      } else if (requestMethod === 'post' || requestMethod === 'put') {
        console.log('post请求')
        // return this._requestPost(url, data, header)
      } else {
        return reject(new Error('非法的method参数，method需在get,post,delete,put范围内'))
      }
    })
  }

  _requestGet(url, data, header) {
    return this.http.get(url, { params: data, header })
       .then(res => Promise.resolve(res))
       .catch(err => Promise.reject(err))
  }

  _requestPost(url, data, header) {
    return this.http.post(url, data, header)
       .then(res => Promise.resolve(res))
       .catch(err => Promise.reject(err))
  }
}
