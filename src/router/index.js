import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
// import { RouterTabRoutes } from 'vue-router-tab'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/Main',
      meta: {
        title: '主页',
        icon: 'el-icon-s-grid',
        affix: true
      },
      children: [
        {
          path: '/Main',
          component: () => import('@/view/Main'),
          name: 'Main',
          meta: {
            title: '主页',
            icon: 'el-icon-menu',
            activeMenu: '/',
            affix: true
          }
        }
      ]
    },
    {
      path: '/form',
      component: Layout,
      redirect: '/textarea',
      meta: {
        title: '表单',
        icon: 'el-icon-s-order',
        affix: true
      },
      children: [
        {
          path: '/textarea',
          component: () => import('@/view/form'),
          name: 'Textarea',
          meta: {
            title: '表单',
            icon: 'el-icon-menu',
            activeMenu: '/form'
          }
        }
      ]
    },
    // {
    //   path: '/equipment',
    //   component: Layout,
    //   redirect: '/equipment/info',
    //   meta: {
    //     title: '设备管理',
    //     icon: 'el-icon-receiving',
    //     affix: true
    //   },
    //   children: [
    //     {
    //       path: '/equipment/info',
    //       component: () => import('@/view/equipment'),
    //       name: 'Textarea',
    //       meta: {
    //         title: '设备管理',
    //         icon: 'el-icon-receiving',
    //         activeMenu: '/equipment'
    //       }
    //     }
    //   ]
    // },
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
      path: '/element',
      component: Layout,
      redirect: '/element/index',
      meta: {
        title: '组件测试',
        icon: 'el-icon-orange'
      },
      children: [
        {
          path: 'index',
          name: 'social',
          component: () => import('@/view/element.vue'),
          meta: {
            title: 'element',
            icon: 'el-icon-orange',
            activeMenu: '/element'
          }
        }
      ]
    },
    {
      path: '/map',
      component: Layout,
      redirect: '/map/index',
      meta: {
        title: '地图',
        icon: 'el-icon-map-location'
      },
      children: [
        {
          path: 'index',
          name: 'mapIndex',
          component: () => import('@/view/map.vue'),
          meta: {
            title: 'map',
            icon: 'el-icon-map-location',
            activeMenu: '/map'
          }
        }
      ]
    },
    {
      path: '/code',
      component: Layout,
      redirect: '/code/index',
      meta: {
        title: '二维码扫描',
        icon: 'el-icon-full-screen'
      },
      children: [
        {
          path: 'index',
          name: 'codeIndex',
          component: () => import('@/view/code.vue'),
          meta: {
            title: 'code',
            icon: 'el-icon-full-screen',
            activeMenu: '/code'
          }
        }
      ]
    },
    {
      path: '/md',
      component: Layout,
      redirect: '/md/index',
      meta: {
        title: 'MD文件',
        icon: 'el-icon-s-order'
      },
      children: [
        {
          path: 'index',
          name: 'mdIndex',
          component: () => import('@/view/md.vue'),
          meta: {
            title: 'md',
            icon: 'el-icon-full-screen',
            activeMenu: '/md'
          }
        }
      ]
    },
    {
      path: '/world',
      component: Layout,
      redirect: '/world/index',
      meta: {
        title: 'world文件',
        icon: 'el-icon-download'
      },
      children: [
        {
          path: 'index',
          name: 'worldIndex',
          component: () => import('@/view/world.vue'),
          meta: {
            title: 'world',
            icon: 'el-icon-download',
            activeMenu: '/world'
          }
        }
      ]
    }
  ]
})
