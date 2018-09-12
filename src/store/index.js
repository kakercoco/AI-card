import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import err from './modules/err'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    err
  }
})

export default store
