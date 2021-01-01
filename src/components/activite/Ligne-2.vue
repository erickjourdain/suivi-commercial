<template>
  <c-row>
    <c-col sm="6" lg="3">
      <widget-icon
        :query="queryDemandes"
        color="gradient-primary"
        :titre="['Délais traitement', '0.00', 'jours']"
        icon="cil-av-timer"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-icon
        :query="queryOpportunites"
        color="gradient-info"
        :titre="['Délais traitement', '0.00', 'jours']"
        icon="cil-av-timer"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-icon
        :query="queryDevis"
        color="gradient-warning"
        :titre="['Devis moyen', '0,000$', '']"
        icon="cil-euro"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-icon
        :query="queryCommandes"
        color="gradient-danger"
        :titre="['Commande moyenne', '0,000$', '']"
        icon="cil-euro"
      />
    </c-col>
  </c-row>
</template>

<script>
import { delaiDemandes, delaiOpportunites, moyenneDevis, moyenneCommandes } from '@/assets/queries/activite/ligne2'
import WidgetIcon from '@/components/cards/WidgetIcon'

export default {
  name: 'ActiviteLigne2',
  components: {
    WidgetIcon
  },
  data () {
    return {
      queryDemandes: delaiDemandes,
      queryOpportunites: delaiOpportunites,
      queryDevis: moyenneDevis,
      queryCommandes: moyenneCommandes
    }
  }
}
</script>
