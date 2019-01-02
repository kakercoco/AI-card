
const app = {
  namespaced: true,
  state: {
    device: 'desktop',
    Unread:0,
    global_dialog:false
  },
  mutations: {
    //未读消息
    ADD_Unread:(state) => {
        state.Unread ++
    },

    Empty:(state) => {
        state.Unread = 0;
    },

    //打开蒙层
    open_global_dialog:(state) => {
        state.global_dialog = true;
    },

    //关闭蒙层
    close_global_dialog:(state) => {
        state.global_dialog = false;
    },


  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar ({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
