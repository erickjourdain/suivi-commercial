<template>
  <c-row>
    <c-col sm="6" lg="3">
      <widget
        :query="queryDemandes"
        color="primary"
        titre="Demandes"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget
        :query="queryOpportunites"
        color="info"
        titre="Opportunités"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget
        :query="queryDevis"
        color="warning"
        titre="Devis"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget
        :query="queryCommandes"
        color="danger"
        titre="Commandes"
      />
    </c-col>
  </c-row>
</template>

<script>
import Widget from '@/components/Widget'

export default {
  name: 'Widgets',
  components: {
    Widget
  },
  data () {
    return {
      queryDemandes: {
        measures: ['Demandes.compte'],
        dimensions: ['Demandes.creation'],
        timeDimensions: [{ dimension: 'Demandes.creation' }]
      },
      queryOpportunites: {
        measures: ['Opportunites.compte'],
        dimensions: ['Opportunites.creation'],
        timeDimensions: [{ dimension: 'Opportunites.creation' }]
      },
      queryDevis: {
        measures: ['Devis.compte'],
        dimensions: ['Devis.creation'],
        timeDimensions: [{ dimension: 'Devis.creation' }]
      },
      queryCommandes: {
        measures: ['Commandes.compte'],
        dimensions: ['Commandes.creation'],
        timeDimensions: [{ dimension: 'Commandes.creation' }]
      }
    }
  }
}
</script>
