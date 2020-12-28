<template>
  <router-view
    v-if="!loading"
  />
</template>

<script>
import { createInstance } from '@/services/api'

export default {
  name: 'App',
  data () {
    return {
      loading: true
    }
  },
  async created () {
    this.loading = true
    await createInstance()
    this.loading = false
  }
}
</script>

<style lang="scss">
@import 'assets/scss/style';
</style>
