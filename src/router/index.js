import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/pages/Login'
import Index from '../components/pages/Index'
import OLEcharts from '../components/pages/OL-Echarts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: OLEcharts
    }
  ]
})
