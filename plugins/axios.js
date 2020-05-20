import { getCookie } from '~/libs/utils';

export default function ({ store, redirect, app: { $axios } }) {
  // $axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  $axios.onRequest(config => {
    if (getCookie('token')) config.headers['Authorization'] = getCookie('token');
    return config;
  })
  $axios.onResponse((response) => {
    let data = response.data;
    if (data.status === 400 || data.status === 500) {
      return Promise.reject(data.msg);
    } else if (data.status === 200) {
      return data;
    }
  })
  $axios.onError(error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('登录失效')
      }
    }
    return Promise.reject(error)
  })
}