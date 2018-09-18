// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '@/utils/rem.js'
import '@/styles/index.scss' // 全局样式
import '../static/css/face.css'
import '../static/css/base.css'
import './permission.js'

import Global from '@/utils/global'
import { ToastPlugin, LoadingPlugin, WechatPlugin } from 'vux'

import { wxConfig } from '@/api/card'

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
wxConfig()
  .then(res => {
    const config = res.data
    config.beta = true
    config.debug = true
    config.jsApiList = ['startRecord', 'stopRecord']
    Vue.wechat.config(config)
  })
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
