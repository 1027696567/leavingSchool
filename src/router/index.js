import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import InformationInfo from '../page/menu1/InformationInfo'
import InformationList from '../page/menu1/InformationList'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/InformationInfo',
      name: InformationInfo,
      component: InformationInfo
    },
    {
      path: '/InformationList',
      name: InformationList,
      component: InformationList
    }
  ],
  mode: 'history'
})

export default router
