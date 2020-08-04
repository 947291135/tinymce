
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

//   Vuex模块化使用案例
//   this.$store.commit('app/device_mutations', true)
//   this.$store.dispatch('app/device_actions', true)
//   this.$store.getters.NewsNumber

//  也可以使用辅助函数 import { mapMutations, mapGetters,mapActions } from 'vuex'
//  但是模块化不能使用直接使用辅助函数，参考文档https://vuex.vuejs.org/zh/guide/modules.html
// import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapActions } = createNamespacedHelpers('app') // app指的模块名
// methods: {
//   handleCityClick () {
//     this.device_actions(true)
//   },
//   ...mapActions(['device_actions'])
// },
// computed: {
//   ...mapState({
//      list: state => state.device
//   })
// }
const store = new Vuex.Store({
  modules,
  getters
})

export default store
