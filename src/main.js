// 导入App.vue，基于App.vue创建结构渲染index.html
// 1、导入Vue核心包
import Vue from 'vue'
// 2、导入根组件
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'

// 数据字典
import dict from './components/Dict'

// 权限指令
import checkPer from '@/utils/permission'
import permission from './components/Permission'
import './assets/styles/element-variables.scss'

// global css
import './assets/styles/index.scss'

import App from './App'
import store from './store'
import router from './router/routers'

import './assets/icons' // icon
import './router/index' // permission control

Vue.use(checkPer)
Vue.use(permission)
Vue.use(dict)
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

Vue.config.productionTip = false
// 3、Vue实例化，提供render方法->基于App.vue创建结构渲染index.html
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
