// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
// JQ
import $ from 'jquery'
// element 按需引入
import {Form, FormItem, Input, Icon, Button, Select, Option, Switch, Upload, Table, TableColumn, Tooltip, Message, Loading, Dialog, MessageBox, Row, Col, Menu, Submenu, MenuItem, MenuItemGroup} from 'element-ui'
// axios
import http from '@/assets/js/axios'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Option)
Vue.use(Tooltip)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading.directive)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$http = http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
