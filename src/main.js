// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './api/api'
import http from './utils/http'
import * as types from './store/mutations_type'

Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'small', zIndex: 3000})
Vue.prototype.api = api
Vue.prototype.http = http
if (localStorage.getItem('user')) {
  let routes = JSON.parse(localStorage.getItem('routes'))
  store.dispatch('add_Routes', routes)
}
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
// 登录状态判断
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('user') && to.path !== '/login') {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  } else if (localStorage.getItem('user') && to.path === '/login') {
    next({path: '/menu1_item1'})
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
