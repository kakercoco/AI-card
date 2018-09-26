// import { login, logout, getInfo } from '@/api/login'
import { getToken } from '@/utils/auth'

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    info:{},
    websocketConnection:{},//用的全局聊天对象
    my_chat_token:'',//用于请求聊天服务器接口的凭证
    my_chat_room_id:'',//使用者当前的回话id
    // chat_domain:'http://192.168.40.176:8080',
    // chat_ws: 'ws://192.168.40.176:3838',
    chat_domain: 'https://chattyun.71360.com',
    chat_ws: 'wss://chattyun.71360.com/wss'

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    //设置用户信息
    SET_INFO:(state, data) => {
        state.info = data;
    },

    //设置聊天对象
    SET_websocket:(state, data) => {
        state.websocketConnection = data;
    },

    //用于请求聊天服务器接口的凭证
    SET_my_chat_token:(state, token) => {
        state.my_chat_token = token;
    },

    //用于请求聊天服务器接口的凭证
    SET_my_chat_room_id:(state, id) => {
        state.my_chat_room_id = id;
    },

    //设置message_id
    SET_my_message_id:(state,id) => {
        state.info.message_id = id;
    },

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
