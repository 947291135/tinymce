import Vue from 'vue'
// element 按需引入
import {Card, Cascader, Form, FormItem, Input, Icon, Button, Select, Option, Switch, Upload, Table, TableColumn, Tooltip, Message, Loading, Dialog, MessageBox, Row, Col, Menu, Submenu, MenuItem, MenuItemGroup} from 'element-ui'
Vue.use(Card)
Vue.use(Cascader)
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
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm