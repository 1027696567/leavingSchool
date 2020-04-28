import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

export default router
