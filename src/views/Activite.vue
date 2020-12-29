<template>
  <div>
    <widgets />
    <widgets-icon />
  </div>
</template>

<script>
import Widgets from '@/components/activite/Widgets'
import WidgetsIcon from '@/components/activite/WidgetsIcon'

export default {
  name: 'Activite',
  components: {
    Widgets,
    WidgetsIcon
  }
}
</script>
