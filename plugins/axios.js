import api from '@/api'

export default ({ $axios, redirect }, inject) => {
  const createRequest = api($axios)

  $axios.onRequest((config) => {
    return config
  })
  $axios.onResponse((response) => {
    // if (data.status === 400 || data.status === 500) {
    //   return Promise.reject(data.msg);
    // } else if (data.status === 200) {
    //   return data;
    // }
    return response
  })
  $axios.onError(error => {
    if(error.response.status === 500) {
      redirect('/')
    }
  })

  inject('api', createRequest)
}
