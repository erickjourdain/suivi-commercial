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
import Widget from '@/components/cards/Widget'

export default {
  name: 'Widgets',
  components: {
    Widget
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
  }
}
</script>
