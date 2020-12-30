<template>
  <c-sidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => setState(['show', value])"
  >
    <c-sidebar-brand
      class="d-md-down-none"
      to="/"
    >
      <c-icon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewbox="0 0 556 134"
      />
      <c-icon
        class="c-sidebar-brand-minized"
        name="logo"
        size="custom-size"
        :height="35"
        viewbox="0 0 110 134"
      />
    </c-sidebar-brand>

    <c-sidebar-nav>
      <c-sidebar-nav-title>
        <span>
          FILTRES
        </span>
      </c-sidebar-nav-title>
      <c-sidebar-form>
        <c-select
          class="mx-3"
          label=""
          :value.sync="test"
          :options="options"
        />
      </c-sidebar-form>
    </c-sidebar-nav>

    <c-sidebar-minimizer
      class="d-md-dowxn-none"
      @click.native="setState(['minimize', !minimize])"
    />
  </c-sidebar>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TheSidebar',
  data () {
    return {
      test: 0,
      options: [
        { value: 1, label: 'un' },
        { value: 2, label: 'deux' },
        { value: 3, label: 'trois' }
      ]
    }
  },
  computed: {
    ...mapState('sidebar', {
      show: 'show',
      minimize: 'minimize'
    })
  },
  methods: {
    ...mapActions('sidebar', {
      setState: 'set'
    })
  }
}
</script>
