import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './router/router-permission'
//css初始化
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import 'normalize.css'
import './GobalComponent/index'
import i18n from './lang/index'
Vue.config.productionTip = false
//挂载网络请求非方法
import api from './api'
Vue.prototype.$api = api
//loadsh
import _ from 'lodash'
console.log('process.env--process.env----',process.env);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
