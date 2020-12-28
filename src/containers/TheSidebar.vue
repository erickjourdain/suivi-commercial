<template>
  <c-sidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => setState('set', ['sidebarShow', value])"
  >
    <c-sidebar-brand
      class="d-md-down-none"
      to="/"
    >
      <c-icon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewbox="0 0 556 134"
      />
      <c-icon
        class="c-sidebar-brand-minized"
        name="logo"
        size="custom-size"
        :height="35"
        viewbox="0 0 110 134"
      />
    </c-sidebar-brand>

    <c-sidebar-nav>
      <c-sidebar-nav-title>
        <span>
          FILTRES
        </span>
      </c-sidebar-nav-title>
      <c-sidebar-form>
        <c-select
          class="mx-3"
          label="Période"
          :value.sync="periode"
          :options="periodes"
        />
        <c-select
          class="mx-3"
          label="Regroupement"
          :value.sync="regroupement"
          :options="regroupements"
        />
      </c-sidebar-form>
    </c-sidebar-nav>

    <c-sidebar-minimizer
      class="d-md-dowxn-none"
      @click.native="setState('set', ['sidebarMinimize', !minimize])"
    />
  </c-sidebar>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { find, findIndex } from 'lodash'

export default {
  name: 'TheSidebar',
  data () {
    return {
      periode: null,
      regroupement: null,
      periodes: [],
      regroupements: []
    }
  },
  created () {
    this.periode = this.optionsPeriode[this.dataRangeindex].value
    this.regroupement = this.optionsRegroupement[this.granularityIndex].value
    this.periodes = this.optionsPeriode
    this.regroupements = this.optionsRegroupement
  },
  computed: {
    ...mapState('sidebar', {
      show: 'show',
      minimize: 'minimize',
      granularityIndex: 'granularityIndex',
      dataRangeindex: 'dateRangeIndex',
      optionsPeriode: 'availableDateRange',
      optionsRegroupement: 'availableGranularities'
    })
  },
  methods: {
    ...mapActions('sidebar', {
      setState: 'set'
    })
  },
  watch: {
    periode (value, oldValue) {
      const selected = findIndex(this.periodes, { value })
      const regroupementJour = find(this.regroupements, { value: 'day' })
      if (selected >= 0 && regroupementJour) {
        if (value === '12mois' || value === 'annee') {
          regroupementJour.disabled = true
          if (this.regroupement === 'day') this.regroupement = 'week'
        } else {
          regroupementJour.disabled = false
        }
        this.setState(['dateRangeIndex', selected])
      }
    },
    regroupement (value) {
      const selected = findIndex(this.regroupements, { value })
      if (selected >= 0) {
        this.setState(['granularityIndex', selected])
      }
    }
  }
}
</script>
