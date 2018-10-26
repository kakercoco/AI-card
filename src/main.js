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
import {
  ToastPlugin,
  LoadingPlugin,
  WechatPlugin,
  ConfirmPlugin,
  AlertPlugin
} from 'vux'

import {
  wxConfig
} from '@/api/card'
import Vconsole from 'vconsole'
if (process.env.NODE_ENV != 'development') {
  var vConsole = new Vconsole()
}
//var vConsole = new Vconsole()
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)

wxConfig(location.href.split('#')[0])
  .then(res => {
    const config = res.data
    config.beta = true
    config.debug = false
    config.jsApiList = ['startRecord', 'stopRecord', 'onVoiceRecordEnd', 'uploadVoice', 'downloadVoice', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd']
    Vue.wechat.config(config)
  })
  .catch(error => {
    console.log(error)
  })
// 全局方法集

Vue.prototype.Global = new Global(Vue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
