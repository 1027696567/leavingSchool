import axios from 'axios'
import store from '../store/login'
import Store from '../store/store'
import router from '../router'
import ElementUI from 'element-ui'
import * as types from '../store/mutations_type'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://127.0.0.1:7011'
axios.defaults.headers.contentType = 'application/json'
export default axios
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 200:
        ElementUI.Message.success(response.data.msg)
        break
      case 20001:
        ElementUI.Message.error(response.data.msg)
        Store.commit(types.LOGOUT)
        localStorage.removeItem('routes')
        localStorage.removeItem('user')
        localStorage.removeItem('menuData')
        localStorage.removeItem('menuData1')
        localStorage.removeItem('menuData2')
        // 只有在当前路由不是登录页面才跳转
        router.currentRoute.path !== 'login' &&
        router.replace({
          path: 'login',
          query: { redirect: router.currentRoute.path }
        })
        break
      default:
        ElementUI.Message.error(response.data.msg)
    }
    return response
  },
  error => {
    if (error.response) {
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error)
  }
)
