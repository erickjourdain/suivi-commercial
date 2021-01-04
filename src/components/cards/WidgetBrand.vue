<template>
  <c-widget-brand
    :color="color"
    :rightHeader="rightHeader"
    :rightFooter="titre.right[0]"
    :leftHeader="leftHeader"
    :leftFooter="titre.left[0]"
    class="w-100"
  >
    <c-icon
      :name="icon"
      height="56"
      class="my-4"
    />
  </c-widget-brand>
</template>

<script>
import { mapGetters } from 'vuex'
import { findIndex } from 'lodash'
import { loadData } from '@/services/cube'

export default {
  name: 'WidgetBrand',
  props: {
    color: {
      type: String,
      required: true
    },
    titre: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      default: 'cil-settings'
    },
    queries: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      data: []
    }
  },
  computed: {
    ...mapGetters('activite', {
      dateRange: 'dateRange'
    }),
    rightHeader () {
      return this.data[0]
        ? this.$options.filters.numberFormat(this.data[0].sum, this.titre.right[1])
        : '-'
    },
    leftHeader () {
      return this.data[1]
        ? this.$options.filters.numberFormat(this.data[1].sum, this.titre.left[1])
        : '-'
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    async getData () {
      this.loading = true
      const data = []
      for (let index = 0; index < this.queries.length; index++) {
        const query = Object.assign({}, this.queries[index])
        const ind = findIndex(query.filters, { operator: 'inDateRange' })
        query.filters[ind] = {
          ...query.filters[ind],
          values: this.dateRange.range
        }
        data[index] = await loadData(query)
      }
      this.data = [...data]
      this.loading = false
    }
  },
  watch: {
    async dateRange () {
      await this.getData()
    } /* ,
    async granularity () {
      await this.getData()
    } */
  }
}
</script>
