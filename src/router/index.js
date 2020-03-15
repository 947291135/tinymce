import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/view/index'),
      meta: {
        title: '首页',
        icon: 'el-icon-menu'
      }
    },
    {
      path: '/axios',
      name: 'axios',
      component: () => import('@/view/axios'),
      meta: {
        title: 'Axios',
        icon: 'el-icon-s-promotion'
      }
    }
  ]
})
