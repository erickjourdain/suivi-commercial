<template>
  <c-row>
    <c-col sm="6" lg="3">
      <widget-brand
        color="primary"
        icon="cil-chat-bubble"
        :titre="{
          right: ['ouvertes', '0,000'],
          left: ['en retard', '0,000']
        }"
        :queries="queriesDemandes"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-brand
        color="info"
        icon="cil-task"
        :titre="{
          right: ['ouvertes', '0,000'],
          left: ['en retard', '0,000']
        }"
        :queries="queriesOpportunites"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-brand
        color="warning"
        icon="cil-list-rich"
        :titre="{
          right: ['émis', '0.00a$'],
          left: ['à relancer', '0.00a$']
        }"
        :queries="queriesDevis"
      />
    </c-col>
    <c-col sm="6" lg="3">
      <widget-brand
        color="danger"
        icon="cil-description"
        :titre="{
          right: ['enregistrées', '0.00a$'],
          left: ['en attente', '0.00a$']
        }"
        :queries="queriesCommandes"
      />
    </c-col>
  </c-row>
</template>

<script>
import {
  demandesOuvertes,
  demandesEnRetard,
  opportunitesOuvertes,
  opportunitesEnRetard,
  devisEmis,
  devisARelancer,
  commandesEnregistrees,
  commandesEnAttente
} from '@/assets/queries/activite/ligne3'
import WidgetBrand from '@/components/cards/WidgetBrand'

export default {
  name: 'ActiviteLigne3',
  components: {
    WidgetBrand
  },
  data () {
    return {
      queriesDemandes: [demandesOuvertes, demandesEnRetard],
      queriesOpportunites: [opportunitesOuvertes, opportunitesEnRetard],
      queriesDevis: [devisEmis, devisARelancer],
      queriesCommandes: [commandesEnregistrees, commandesEnAttente]
    }
  }
}
</script>
