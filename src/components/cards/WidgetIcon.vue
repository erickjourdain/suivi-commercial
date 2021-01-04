<template>
    <c-widget-icon
      :header="valeur"
      :text="titre[0]"
      :color="color"
      :icon-padding="false"
    >
      <c-icon
        :name="icon"
        width="24"
      />
    </c-widget-icon>
</template>

<script>
import { mapGetters } from 'vuex'
import { findIndex } from 'lodash'
import { loadData } from '@/services/cube'

export default {
  name: 'WidgetIcon',
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
      type: Array,
      required: true
    },
    icon: {
      type: String,
      default: 'cil-settings'
    }
  },
  data () {
    return {
      loading: true,
      data: null
    }
  },
  computed: {
    ...mapGetters('activite', {
      dateRange: 'dateRange'
    }),
    valeur () {
      if (this.data) {
        return `${this.$options.filters.numberFormat(this.data.average, this.titre[1])} ${this.titre[2]}`
      } else {
        return '-'
      }
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    async getData () {
      this.loading = true
      const query = Object.assign({}, this.query)
      const index = findIndex(query.filters, { operator: 'inDateRange' })
      query.filters[index] = {
        ...query.filters[index],
        values: this.dateRange.range
      }
      this.data = await loadData(query)
      this.loading = false
    }
  },
  watch: {
    async dateRange () {
      await this.getData()
    } /*,
    async granularity () {
      await this.getData()
    } */
  }
}
</script>
