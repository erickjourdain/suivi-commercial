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
import { distributionMotifs, delaiTraitement, enRetard } from '@/assets/queries/opportunites/ligne1'
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
      ouvertes: distributionMotifs,
      enRetard: enRetard,
      delaisTraitement: delaiTraitement
    }
  }
}
</script>
