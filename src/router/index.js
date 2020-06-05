import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
// import { RouterTabRoutes } from 'vue-router-tab'
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
          path: '/textarea',
          component: () => import('@/view/index'),
          name: 'Textarea',
          meta: {
            title: '首页',
            icon: 'el-icon-menu',
            activeMenu: '/'
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
            icon: 'el-icon-s-promotion',
            activeMenu: '/axios'
          }
        }
      ]
    },
    {
      path: '/upload',
      component: Layout,
      redirect: '/upload/index',
      meta: {
        title: '七牛图片上传',
        icon: 'el-icon-upload'
      },
      children: [
        {
          path: 'index',
          name: 'upload',
          component: () => import('@/view/upload.vue'),
          meta: {
            title: 'upload',
            icon: 'el-icon-upload',
            activeMenu: '/upload'
          }
        }
      ]
    },
    {
      path: '/social',
      component: Layout,
      redirect: '/social/index',
      meta: {
        title: '聊天系统',
        icon: 'el-icon-orange'
      },
      children: [
        {
          path: 'index',
          name: 'social',
          component: () => import('@/view/upload.vue'),
          meta: {
            title: 'upload',
            icon: 'el-icon-orange',
            activeMenu: '/social'
          }
        }
      ]
    }
  ]
})
