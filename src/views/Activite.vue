<template>
  <div>
    <filtres />
    <ligne-1 />
    <ligne-2 />
    <ligne-3 />
  </div>
</template>

<script>
import Filtres from '@/components/activite/Filtres'
import Ligne1 from '@/components/activite/Ligne-1'
import Ligne2 from '@/components/activite/Ligne-2'
import Ligne3 from '@/components/activite/Ligne-3'

export default {
  name: 'Activite',
  components: {
    Filtres,
    Ligne1,
    Ligne2,
    Ligne3
  }
}
</script>
