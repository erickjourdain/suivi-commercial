<template>
  <c-widget-dropdown
    :color="color"
    :header="total"
    :text="titre"
  >
    <template #default />
    <template #footer>
      <c-chart-line-simple
        v-if="!loading"
        class="mt-3"
        style="height:70px"
        background-color="rgba(255,255,255,0.2)"
        :data-points="data.values"
        :options="{ elements: { line: { borderWidth: 2.5 } } }"
        :point-hover-background-color="color"
        :label="titre"
        :labels="data.labels"
      />
      <span
        v-else
        class="mt-3 text-center"
        style="height:70px"
      >
        <c-spinner
          color="secondary"
          grow
        />
      </span>
    </template>
  </c-widget-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadData } from '@/services/cube'
import { CChartLineSimple } from '@/components/charts/index'

export default {
  name: 'Widget',
  components: { CChartLineSimple },
  props: {
    query: {
      type: Object,
      required: true
    },
    color: {
      type: String,
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
      data: null
    }
  },
  computed: {
    ...mapGetters('sidebar', {
      dateRange: 'dateRange',
      granularity: 'granularity'
    }),
    total () {
      return (this.loading) ? '-'
        : this.$options.filters.numberFormat(this.data.sum)
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    async getData () {
      this.loading = true
      const query = Object.assign({}, this.query)
      query.timeDimensions[0] = {
        ...query.timeDimensions[0],
        dateRange: this.dateRange,
        granularity: this.granularity
      }
      this.data = await loadData(query)
      this.loading = false
    }
  },
  watch: {
    async dateRange () {
      await this.getData()
    },
    async granularity () {
      await this.getData()
    }
  }
}
</script>
