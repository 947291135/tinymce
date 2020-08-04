const state = {
  sidebar: {
    oppen: false
  },
  test: 456
}

const mutations = {
  SIDEBAR_MUTATIONS: state => {
    state.sidebar.oppen = !state.sidebar.oppen
  },
  TOGGLE_SIDEBAR: state => {
    state.test = 123
  }
}

const actions = {
  sidebarOpen ({ commit }) {
    commit('SIDEBAR_MUTATIONS')
  },
  test ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
