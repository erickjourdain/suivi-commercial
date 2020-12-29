<template>
  <c-row>
    <c-col sm="12" md="6">
      <pipe
        :query="queryDevis"
        titre="Devis en cours"
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
      queryDevis: {
        measures: ['Devis.value'],
        dimensions: ['Devis.statut'],
        segments: ['Devis.coheris', 'Devis.envoye'],
        order: {
          'Devis.value': 'desc'
        }
      }
    }
  }
}
</script>
