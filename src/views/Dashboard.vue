<template>
  <div>
    <widgets />
    <widgets-icon />
    <pipes />
  </div>
</template>

<script>
import Widgets from '@/components/Widgets'
import WidgetsIcon from '@/components/WidgetsIcon'
import Pipes from '@/components/Pipes'

export default {
  name: 'Dashboard',
  components: {
    Widgets,
    WidgetsIcon,
    Pipes
  }
}
</script>
