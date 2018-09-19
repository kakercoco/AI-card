
const app = {
  namespaced: true,
  state: {
    device: 'desktop',
    Unread:0
  },
  mutations: {
    //未读消息
    ADD_Unread:(state) => {
        state.Unread ++
    },

    Empty:(state) => {
        state.Unread = 0;
    }
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
