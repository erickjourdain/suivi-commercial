<template>
  <div class="c-app">
    <the-sidebar />
    <c-wrapper>
      <the-header />
      <div class="c-body">
        <main class="c-main">
          <c-container fluid>
            <transition
              name="fade"
              mode="out-in"
            >
              <router-view :key="$route.path" />
            </transition>
          </c-container>
        </main>
      </div>
      <the-footer />
    </c-wrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter.vue'

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  }
}
</script>
