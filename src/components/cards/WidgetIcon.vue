<template>
    <c-widget-icon
      :header="valeur"
      :text="titre"
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
  name: 'Widgeticon',
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
    ...mapGetters('sidebar', {
      dateRange: 'dateRange',
      granularity: 'granularity'
    }),
    valeur () {
      if (this.data) {
        if (this.icon === 'cil-av-timer') {
          return `${this.$options.filters.numberFormat(this.data.average, '0.00')} jours`
        } else {
          return this.$options.filters.numberFormat(this.data.average, '0.00a$')
        }
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
        values: this.range()
      }
      this.data = await loadData(query)
      this.loading = false
    },
    range () {
      const yesterday = this.$moment().subtract(1, 'days').format('YYYY-MM-DD')
      switch (this.dateRange) {
        case 'last 30 days':
          return [
            this.$moment().subtract(30, 'days').format('YYYY-MM-DD'),
            yesterday
          ]
        case 'last 12 weeks':
          return [
            this.$moment().subtract(12, 'weeks').format('YYYY-MM-DD'),
            yesterday
          ]
        case 'last 12 months':
          return [
            this.$moment().subtract(12, 'months').format('YYYY-MM-DD'),
            yesterday
          ]
        default:
          return [
            this.$moment().startOf('year').format('YYYY-MM-DD'),
            yesterday
          ]
      }
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
