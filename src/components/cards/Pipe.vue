<template>
  <c-card>
    <c-card-header>
      {{ titre }}
    </c-card-header>
    <c-card-body>
      <div
        class="progress-group"
        v-for="(value, ind) in data.values"
        :key="data.labels[ind]"
      >
        <div class="progress-group-header">
          <span class="title">
            {{ data.labels[ind] }}
          </span>
          <span class="ml-auto font-weight-bold">
            {{ (value) ? (value) : 0 | numberFormat("0.00a$") }}
          </span>
        </div>
        <div class="progress-group-bars">
          <c-progress
            class="progress-xs"
            :value="(value) ? (value/data.sum) * 100 : 0"
            color="warning"
          />
        </div>
      </div>
    </c-card-body>
  </c-card>
</template>

<script>
import { loadData } from '@/services/cube'

export default {
  name: 'Pipe',
  props: {
    query: {
      type: Object,
      required: true
    },
    titre: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      data: []
    }
  },
  async mounted () {
    this.loading = true
    this.data = await loadData(this.query)
    this.loading = false
  }
}
</script>
