<template>
  <div>
    <ligne-1 />
    <ligne-2 />
  </div>
</template>

<script>
import Ligne1 from '@/components/opportunites/Ligne-1'
import Ligne2 from '@/components/opportunites/Ligne-2'

export default {
  name: 'Opportunites',
  components: {
    Ligne1,
    Ligne2
  }
}
</script>
