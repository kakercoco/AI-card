import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import err from './modules/err'
import chat from './modules/chat'
import message from './modules/message'
import work from './modules/work'
import tab from './modules/tab'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    err,
    chat,
    message,
    work,
    tab
  }
})

export default store
