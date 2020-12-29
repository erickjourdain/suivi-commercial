<template>
  <c-header
    fixed
    with-subheader
    light
  >
    <c-toggler
      in-header
      class="ml-3 d-lg-none"
      @click="toggleSidebarMobile"
    >
    </c-toggler>
    <c-toggler
      in-header
      class="ml-3 d-md-down-none"
      @click="toggleSidebarDesktop"
    >
    </c-toggler>
    <c-header-brand
      class="mx-auto d-lg-none"
      to='/'
    >
      <c-icon
        name="logo"
        heigth="48"
        alt="logo"
      />
    </c-header-brand>
    <c-header-nav class="d-md-down-none mr-auto">
      <c-header-nav-item class="px3">
        <c-header-nav-link to='/activite'>
          Activité
        </c-header-nav-link>
      </c-header-nav-item>
      <c-header-nav-item class="px3">
        <c-header-nav-link to='/opportunites'>
          Opportunités
        </c-header-nav-link>
      </c-header-nav-item>
      <c-header-nav-item class="px3">
        <c-header-nav-link to='/devis'>
          Devis
        </c-header-nav-link>
      </c-header-nav-item>
    </c-header-nav>
    <c-subheader class="px-3">
      <c-breadcrumb-router class="border-0 mb-0" />
    </c-subheader>
  </c-header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TheHeader',
  methods: {
    ...mapActions('sidebar', {
      toggleSidebarDesktop: 'toggleSidebarDesktop',
      toggleSidebarMobile: 'toggleSidebarMobile'
    })
  }
}
</script>
