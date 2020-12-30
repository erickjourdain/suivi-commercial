const state = {
  show: 'responsive',
  minimize: false
}

const actions = {
  toggleSidebarDesktop ({ state, commit }) {
    const sidebarOpened = [true, 'responsive'].includes(state.show)
    commit('SET', ['show', sidebarOpened ? false : 'responsive'])
  },
  toggleSidebarMobile ({ state, commit }) {
    const sidebarClosed = [false, 'responsive'].includes(state.show)
    commit('SET', ['show', sidebarClosed ? true : 'responsive'])
  },
  set ({ commit }, payload) {
    commit('SET', payload)
  }
}

const mutations = {
  SET (state, [variable, value]) {
    state[variable] = value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
