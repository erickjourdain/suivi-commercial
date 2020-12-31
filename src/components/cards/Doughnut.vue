<template>
  <c-card>
    <c-card-header>
      {{ titre }}
    </c-card-header>
    <c-card-body>
      <c-chart-doughnut
        v-if="!loading"
        :datasets="defaultDatasets"
        :labels="data.labels"
        :options="{ legend: { position : 'right' } }"
      />
    </c-card-body>
  </c-card>
</template>

<script>
import { CChartDoughnut } from '@coreui/vue-chartjs'
import { loadData } from '@/services/cube'

export default {
  name: 'CardDoughnut',
  components: {
    CChartDoughnut
  },
  props: {
    titre: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      required: true
    },
    bins: {
      type: Array,
      default: () => [
        { min: 0, max: 1, titre: '<1 jour' },
        { min: 1, max: 2, titre: '1 jour' },
        { min: 2, max: 3, titre: '2 à 3 jours' },
        { min: 3, max: 7, titre: '3 à 7 jours' },
        { min: 7, max: 14, titre: '1 à 2 semaines' },
        { min: 14, max: 21, titre: '2 à 3 semaines' },
        { min: 21, max: 500, titre: '> 3 semaines' }
      ]
    },
    colors: {
      type: Array,
      default: () => [
        '#321fdb',
        '#2F242C',
        '#E55353',
        '#2EB85C',
        '#F9B115',
        '#DAC6B5',
        '#3399FF'
      ]
    }
  },
  data () {
    return {
      loading: true,
      data: null
    }
  },
  async mounted () {
    this.loading = true
    this.data = await loadData(this.query, this.bins)
    this.loading = false
  },
  computed: {
    defaultDatasets () {
      return [
        {
          backgroundColor: this.colors,
          data: this.data.values
        }
      ]
    }
  }
}
</script>
