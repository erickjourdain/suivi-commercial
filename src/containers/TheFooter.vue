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
  </c-footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
