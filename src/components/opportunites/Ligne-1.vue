<template>
  <c-row>
    <c-col sm="12" md="6">
      <pipe
        :query="ouvertes"
        titre="Opportunités ouvertes"
      />
    </c-col>
    <c-col sm="12" md="6">
      <widget-icon
        :query="enRetard"
        color="gradient-warning"
        :titre="['En retard', '0,000', '']"
        icon="cil-av-timer"
      />
      <doughnut
        :query="delaisTraitement"
        titre="Délais de traitement"
      />
    </c-col>
  </c-row>
</template>

<script>
import Pipe from '@/components/cards/Pipe.vue'
import WidgetIcon from '@/components/cards/WidgetIcon.vue'
import Doughnut from '@/components/cards/Doughnut.vue'

export default {
  name: 'OpportuniteLigne1',
  components: {
    Pipe,
    WidgetIcon,
    Doughnut
  },
  data () {
    return {
      ouvertes: {
        measures: ['Opportunites.value'],
        dimensions: ['Opportunites.origine'],
        segments: ['Opportunites.coheris'],
        filters: [{
          member: 'Opportunites.origine',
          operator: 'set'
        }],
        order: {
          'Opportunites.value': 'desc'
        }
      },
      enRetard: {
        measures: ['Opportunites.count'],
        segments: ['Opportunites.coheris'],
        filters: [
          { member: 'Opportunites.dateFin', operator: 'notSet' },
          { member: 'Opportunites.dateDecision', operator: 'lt', values: [this.$moment().format('YYYY-MM-DD')] }
        ]
      },
      delaisTraitement: {
        measures: ['Opportunites.count'],
        segments: ['Opportunites.coheris'],
        dimensions: ['Opportunites.delaiTraitement'],
        filters: [
          { member: 'Opportunites.dateFin', operator: 'set' }
        ],
        order: { 'Opportunites.delaiTraitement': 'asc' }
      }
    }
  }
}
</script>
