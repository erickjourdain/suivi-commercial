<template>
  <router-view
    v-if="!loading && user"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { addAuthorisation, createInstance, request } from '@/services/api'

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
    const res = await request({
      method: 'POST',
      url: '/auth/login',
      data: {
        name: 'erick',
        password: 123456
      }
    })
    this.set(['user', res.data.user])
    addAuthorisation(res.data.token)
    this.loading = false
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  methods: {
    ...mapMutations({
      set: 'SET'
    })
  }
}
</script>

<style lang="scss">
@import 'assets/scss/style';
</style>
