// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '@/utils/rem.js'
import '@/styles/index.scss' // 全局样式

import './permission.js'

import Global from '@/utils/global'
// 全局方法集
Vue.prototype.Global = new Global(Vue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
