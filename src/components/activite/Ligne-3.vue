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
          right: ['enregitrées', '0.00a$'],
          left: ['en attente', '0.00a$']
        }"
        :queries="queriesCommandes"
      />
    </c-col>
  </c-row>
</template>

<script>
import WidgetBrand from '@/components/cards/WidgetBrand'

export default {
  name: 'ActiviteLigne3',
  components: {
    WidgetBrand
  },
  data () {
    return {
      queriesDemandes: [
        {
          measures: ['Opportunites.count'],
          filters: [
            { member: 'Opportunites.dateFin', operator: 'notSet' },
            { member: 'Opportunites.dateCreation', operator: 'inDateRange' }
          ]
        },
        {
          measures: ['Opportunites.count'],
          filters: [
            { member: 'Opportunites.dateFin', operator: 'notSet' },
            { member: 'Opportunites.dateDecision', operator: 'lt', values: [this.$moment().format('YYYY-MM-DD')] },
            { member: 'Opportunites.dateCreation', operator: 'inDateRange' }
          ]
        }
      ],
      queriesOpportunites: [
        {
          measures: ['Opportunites.count'],
          filters: [
            { member: 'Opportunites.dateFin', operator: 'notSet' },
            { member: 'Opportunites.dateCreation', operator: 'inDateRange' }
          ]
        },
        {
          measures: ['Opportunites.count'],
          filters: [
            { member: 'Opportunites.dateFin', operator: 'notSet' },
            { member: 'Opportunites.dateDecision', operator: 'lt', values: [this.$moment().format('YYYY-MM-DD')] },
            { member: 'Opportunites.dateCreation', operator: 'inDateRange' }
          ]
        }
      ],
      queriesDevis: [
        {
          measures: ['Devis.value'],
          filters: [
            { member: 'Devis.statut', operator: 'equals', values: ['4'] },
            { member: 'Devis.dateEnvoi', operator: 'inDateRange' }
          ]
        },
        {
          measures: ['Devis.value'],
          filters: [
            { member: 'Devis.statut', operator: 'equals', values: ['4'] },
            { member: 'Devis.dateEnvoi', operator: 'inDateRange' }
          ]
        }
      ],
      queriesCommandes: [
        {
          measures: ['Commandes.value'],
          filters: [
            { member: 'Commandes.dateCommande', operator: 'inDateRange' }
          ],
          segments: ['Commandes.valide']
        },
        {
          measures: ['Commandes.value'],
          filters: [
            { member: 'Commandes.dateCommande', operator: 'inDateRange' }
          ],
          segments: ['Commandes.absente']
        }
      ]
    }
  }
}
</script>
