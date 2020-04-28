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
    if (response.status === 203) {
      console.log('权限不足')
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          ElementUI.Message.error(error.response.data)
          break
        case 402:
          // 401 清除token信息并跳转到登录页面
          ElementUI.Message.error(error.response.data)
          Store.commit(types.LOGOUT)
          localStorage.removeItem('routes')
          localStorage.removeItem('user')
          localStorage.removeItem('menuData')
          sessionStorage.removeItem('itemId')
          sessionStorage.removeItem('costItemNumber')
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.path }
          })
          break
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error)
  }
)
