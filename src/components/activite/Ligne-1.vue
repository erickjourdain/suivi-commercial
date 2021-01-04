<template>
  <c-row>
    <c-col sm="6" lg="3">
      <widget-line-chart
        v-if="dateRange.granularity !== 'day'"
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
        v-if="dateRange.granularity !== 'day'"
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
        v-if="dateRange.granularity !== 'day'"
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
        v-if="dateRange.granularity !== 'day'"
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
import { creationDemandes, creationOpportunites, creationDevis, creationCommandes } from '@/assets/queries/activite/ligne1'
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
      queryDemandes: creationDemandes,
      queryOpportunites: creationOpportunites,
      queryDevis: creationDevis,
      queryCommandes: creationCommandes
    }
  },
  computed: {
    ...mapGetters('activite', {
      dateRange: 'dateRange'
    })
  }
}
</script>
