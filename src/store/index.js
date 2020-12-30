import Vue from 'vue'
import Vuex from 'vuex'

import { addAuthorisation, request } from '@/services/api'
import activite from './activite'
import sidebar from './sidebar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET (state, [variable, value]) {
      state[variable] = value
    }
  },
  actions: {
    async login ({ commit }) {
      try {
        const res = await request({
          method: 'POST',
          url: '/auth/login',
          data: {
            name: 'erick jourdain',
            password: '123456'
          }
        })
        addAuthorisation(res.data.token)
        commit('SET', ['user', res.data.user])
      } catch (error) {
        console.error(error.message)
      }
    }
  },
  modules: {
    activite,
    sidebar
  }
})
