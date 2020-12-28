<template>
  <c-footer :fixed="false">
    <div>
      <span class="ml-1 text-primary">
        Tableau bord commercial
      </span>
      <span class="ml-1">
        &copy; {{ new Date().getFullYear() }} LNE
      </span>
    </div>
    <div class="mfs-auto">
      <span
        class="mr-1"
        target="_blank"
      >
        Power by
      </span>
      <a href="https://coreui.io/vue">
        CoreUI for Vue
      </a>
    </div>
  </c-footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
