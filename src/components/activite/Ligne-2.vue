<template>
  <c-row>
    <c-col sm="6" lg="3">
      <widget-icon
        :query="queryDemandes"
        color="gradient-primary"
        titre="Délais demandes"
        icon="cil-av-timer"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-icon
        :query="queryOpportunites"
        color="gradient-info"
        titre="Délais opportunités"
        icon="cil-av-timer"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-icon
        :query="queryDevis"
        color="gradient-warning"
        titre="Devis moyen"
        icon="cil-euro"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-icon
        :query="queryCommandes"
        color="gradient-danger"
        titre="Commande moyenne"
        icon="cil-euro"
      />
    </c-col>
  </c-row>
</template>

<script>
import WidgetIcon from '@/components/cards/WidgetIcon'

export default {
  name: 'ActiviteLigne2',
  components: {
    WidgetIcon
  },
  data () {
    return {
      queryDemandes: {
        measures: ['Opportunites.count'],
        dimensions: ['Opportunites.delaiTraitement'],
        filters: [{
          member: 'Opportunites.dateFin',
          operator: 'set'
        }, {
          member: 'Opportunites.dateFin',
          operator: 'inDateRange'
        }]
      },
      queryOpportunites: {
        measures: ['Opportunites.count'],
        dimensions: ['Opportunites.delaiTraitement'],
        filters: [{
          member: 'Opportunites.dateFin',
          operator: 'set'
        }, {
          member: 'Opportunites.dateFin',
          operator: 'inDateRange'
        }]
      },
      queryDevis: {
        measures: ['Devis.average'],
        filters: [{
          member: 'Devis.dateEnvoi',
          operator: 'inDateRange'
        }]
      },
      queryCommandes: {
        measures: ['Commandes.average'],
        filters: [{
          member: 'Commandes.dateCommande',
          operator: 'inDateRange'
        }]
      }
    }
  }
}
</script>
