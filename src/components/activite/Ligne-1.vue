<template>
  <c-row>
    <c-col sm="6" lg="3">
      <widget-line-chart
        v-if="granularity !== 'day'"
        :query="queryDemandes"
        color="primary"
        titre="Demandes"
      />
      <widget-bar-chart
        v-else
        :query="queryDemandes"
        color="primary"
        titre="Demandes"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-line-chart
        v-if="granularity !== 'day'"
        :query="queryOpportunites"
        color="info"
        titre="Opportunités"
      />
      <widget-bar-chart
        v-else
        :query="queryOpportunites"
        color="info"
        titre="Opportunités"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-line-chart
        v-if="granularity !== 'day'"
        :query="queryDevis"
        color="warning"
        titre="Devis"
      />
      <widget-bar-chart
        v-else
        :query="queryDevis"
        color="warning"
        titre="Devis"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-line-chart
        v-if="granularity !== 'day'"
        :query="queryCommandes"
        color="danger"
        titre="Commandes"
      />
      <widget-bar-chart
        v-else
        :query="queryCommandes"
        color="danger"
        titre="Commandes"
      />
    </c-col>
  </c-row>
</template>

<script>
import { mapGetters } from 'vuex'
import WidgetLineChart from '@/components/cards/WidgetLineChart'
import WidgetBarChart from '@/components/cards/WidgetBarChart'

export default {
  name: 'ActiviteLigne1',
  components: {
    WidgetLineChart,
    WidgetBarChart
  },
  data () {
    return {
      queryDemandes: {
        measures: ['Devis.count'],
        timeDimensions: [{ dimension: 'Devis.dateEnvoi' }]
      },
      queryOpportunites: {
        measures: ['Opportunites.count'],
        timeDimensions: [{ dimension: 'Opportunites.dateCreation' }]
      },
      queryDevis: {
        measures: ['Devis.count'],
        timeDimensions: [{ dimension: 'Devis.dateEnvoi' }],
        segments: ['Devis.coheris', 'Devis.envoye']
      },
      queryCommandes: {
        measures: ['Commandes.count'],
        timeDimensions: [{ dimension: 'Commandes.dateCommande' }]
      }
    }
  },
  computed: {
    ...mapGetters('activite', {
      granularity: 'granularity'
    })
  }
}
</script>
