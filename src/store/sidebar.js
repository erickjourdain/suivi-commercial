import moment from 'moment'

const state = {
  show: 'responsive',
  minimize: false,
  dateRangeIndex: 1,
  granularityIndex: 1,
  availableDateRange: [
    {
      dateRange: 'last 30 days',
      value: '30jours',
      label: '30 derniers jours',
      disabled: false
    },
    {
      dateRange: 'last 12 weeks',
      value: '12sem',
      label: '12 dernières semaine',
      disabled: false
    },
    {
      dateRange: 'last 12 months',
      value: '12mois',
      label: '12 derniers mois',
      disabled:
      false
    },
    {
      dateRange: [moment().startOf('year').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')],
      value: 'annee',
      label: 'annee courante',
      disabled: false
    }
  ],
  availableGranularities: [
    {
      value: 'day',
      label: 'jour',
      disabled: false
    },
    {
      value: 'week',
      label: 'semaine',
      disabled: false
    },
    {
      value: 'month',
      label: 'mois',
      disabled: false
    }
  ]
}

const actions = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.show)
    state.show = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.show)
    state.show = sidebarClosed ? true : 'responsive'
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

const getters = {
  dateRange (state) {
    return state.availableDateRange[state.dateRangeIndex].dateRange
  },
  granularity (state) {
    return state.availableGranularities[state.granularityIndex].value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
