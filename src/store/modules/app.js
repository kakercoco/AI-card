
const app = {
  state: {
    device: 'desktop'
  },
  mutations: {
    // CLOSE_SIDEBAR: (state, withoutAnimation) => {
    //   Cookies.set('sidebarStatus', 1)
    //   state.sidebar.opened = false
    //   state.sidebar.withoutAnimation = withoutAnimation
    // },
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
