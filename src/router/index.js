import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/textarea',
      meta: {
        title: '首页',
        icon: 'el-icon-menu'
      },
      children: [
        {
          path: 'textarea',
          component: () => import('@/view/index'),
          name: 'Textarea',
          meta: {
            title: '首页',
            icon: 'el-icon-menu'
          }
        }
      ]
    },
    {
      path: '/axios',
      component: Layout,
      redirect: '/axios/index',
      meta: {
        title: 'Axios',
        icon: 'el-icon-s-promotion'
      },
      children: [
        {
          path: 'index',
          name: 'Axios',
          component: () => import('@/view/axios.vue'),
          meta: {
            title: 'Axios',
            icon: 'el-icon-s-promotion'
          }
        }
      ]
    }
  ]
})
