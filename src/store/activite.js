import moment from 'moment'
const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')

const state = {
  dateRangeIndex: 1,
  // granularityIndex: 1,
  availableDateRange: [
    {
      dateRange: 'last 30 days',
      range: [moment().subtract(31, 'days').format('YYYY-MM-DD'), yesterday],
      value: '30jours',
      label: '30 derniers jours',
      disabled: false,
      granularity: 'day'
    },
    {
      dateRange: 'last 12 weeks',
      range: [moment().subtract(12, 'weeks').startOf('week').format('YYYY-MM-DD'), yesterday],
      value: '12sem',
      label: '12 dernières semaines',
      disabled: false,
      granularity: 'week'
    },
    {
      dateRange: 'last 12 months',
      range: [moment().subtract(12, 'months').startOf('month').format('YYYY-MM-DD'), yesterday],
      value: '12mois',
      label: '12 derniers mois',
      disabled: false,
      granularity: 'month'
    },
    {
      dateRange: 'this year',
      range: [moment().startOf('year').format('YYYY-MM-DD'), yesterday],
      value: 'annee',
      label: 'annee courante',
      disabled: false,
      granularity: 'month'
    }
  ] /*,
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
  ] */
}

const actions = {
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
    return state.availableDateRange[state.dateRangeIndex]
  } /*,
  granularity (state) {
    return state.availableGranularities[state.granularityIndex]
  } */
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
