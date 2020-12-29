<template>
  <c-row>
    <c-col sm="12" md="6">
      <pipe
        :query="queryOpportunites"
        titre="Opportunités ouvertes"
      />
    </c-col>
  </c-row>
</template>

<script>
import Pipe from '@/components/cards/Pipe.vue'

export default {
  name: 'Pipes',
  components: {
    Pipe
  },
  data () {
    return {
      queryOpportunites: {
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
      }
    }
  }
}
</script>
