// import { login, logout, getInfo } from '@/api/login'
import { getToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   return new Promise((resolve, reject) => {
    //     setToken('admin')
    //     commit('SET_TOKEN', 'admin')
    //     resolve()
    //   })
    // },

    // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // }
  }
}

export default user
