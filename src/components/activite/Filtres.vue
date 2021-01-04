<template>
  <c-card>
    <c-card-body>
      <c-sidebar-form>
        <c-row>
          <c-col sm="6" md="4" lg="3">
            <c-select
              class="mx-3"
              label="Période"
              :value.sync="periode"
              :options="periodes"
            />
          </c-col>
          <!--
          <c-col sm="6" md="4" lg="3">
            <c-select
              class="mx-3"
              label="Regroupement"
              :value.sync="regroupement"
              :options="regroupements"
            />
          </c-col>
          -->
        </c-row>
      </c-sidebar-form>
    </c-card-body>
  </c-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import { find, findIndex } from 'lodash'
import { findIndex } from 'lodash'

export default {
  name: 'Filtres',
  data () {
    return {
      periode: null,
      periodes: []
      /*
      regroupement: null,
      periodes: [],
      */
    }
  },
  created () {
    this.periode = this.optionsPeriode[this.dataRangeindex].value
    // this.regroupement = this.optionsRegroupement[this.granularityIndex].value
    this.periodes = this.optionsPeriode
    // this.regroupements = this.optionsRegroupement
  },
  computed: {
    ...mapState('activite', {
      // granularityIndex: 'granularityIndex',
      dataRangeindex: 'dateRangeIndex',
      optionsPeriode: 'availableDateRange' //,
      // optionsRegroupement: 'availableGranularities'
    })
  },
  methods: {
    ...mapActions('activite', {
      setState: 'set'
    })
  },
  watch: {
    periode (value, oldValue) {
      const selected = findIndex(this.periodes, { value })
      /*
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
      */
      if (selected !== undefined) this.setState(['dateRangeIndex', selected])
    } /*,
    regroupement (value) {
      const selected = findIndex(this.regroupements, { value })
      if (selected >= 0) {
        this.setState(['granularityIndex', selected])
      }
    } */
  }
}
</script>
