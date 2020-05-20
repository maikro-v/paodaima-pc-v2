import axios from 'axios'

export default (options) => {
  let { url, method = 'get', data } = options
  if (method.toLowerCase() !== 'get' && method.toLowerCase() !== 'post' && method.toLowerCase() !== 'delete' && method.toLowerCase() !== 'put') {
    return 'methtod类型必须是get,post,delete,put中的一种'
  }
  let params = {}
  if (data) {
    if (method === 'get' || method === 'delete') {
      params.params = data
    } else {
      params = data
    }
  }
  
  return axios[method](url, params)
}
