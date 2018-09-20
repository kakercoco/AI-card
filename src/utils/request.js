import axios from 'axios'
import store from '../store'
// import { getToken } from '@/utils/auth'

let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = '/index.php'
} else {
  baseURL = process.env.BASE_API
}

// 创建axios实例
const service = axios.create({
  baseURL, // process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 200) {
      alert(res.msg)

      // 201:Token 过期了;
      if (res.code === 201) {
        alert('用户信息过期，请重新登录')
        // 如果可以请关闭窗口
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    alert(error)
    return Promise.reject(error)
  }
)

export default service
