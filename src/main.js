// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// vuex
import store from './store'
// Vue-router-tab
import RouterTab from 'vue-router-tab'
import 'vue-router-tab/dist/lib/vue-router-tab.css'
// JQ
import $ from 'jquery'
// element 按需引入
import '@/assets/js/element'
import 'element-ui/lib/theme-chalk/index.css'
// 大数据展示UI库按需引入
import '@/assets/js/DataView'
// axios
import http from '@/assets/js/axios'
// Added non-passive event listener to a scroll-blocking 'mousewheel' event. 警告报错消除
// import 'default-passive-events'
// 基于vue-cli配置手淘的lib-flexible + rem，实现移动端自适应
import 'lib-flexible/flexible.js'

Vue.prototype.$http = http
Vue.prototype.$isMobile = () => {
  let sUserAgent = navigator.userAgent.toLowerCase()
  let bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
  let bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
  let bIsMidp = sUserAgent.match(/midp/i) == 'midp'
  let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
  let bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
  let bIsAndroid = sUserAgent.match(/android/i) == 'android'
  let bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
  let bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
  console.log(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)
  if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
    return false
  } else {
    return true
  }
}
// 阻止生产环境提示
Vue.config.productionTip = false
Vue.use(RouterTab)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
