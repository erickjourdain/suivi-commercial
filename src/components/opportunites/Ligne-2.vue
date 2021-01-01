<template>
  <c-card>
    <c-card-body>
      <c-data-table
        :items="items"
        :fields="fields"
        column-filter
        @update:column-filter-value="filterChange"
        items-per-page-select
        :items-per-page="itemsPerPage"
        @pagination-change="paginationChange"
        :loadin="loading"
        hover
        cleaner
        :sorter="{ resetable: true }"
        @update:sorter-value="soterChange"
      >
        <template #cleaner="{ isFiltered, clean }">
          <c-button
            size="sm"
            color="primary"
            :disabled="!isFiltered"
            @click="reset(clean)"
          >
            reset
          </c-button>
        </template>
        <template #dateCreation="{ item }">
          <td>
            {{ date(item["dateCreation"]) }}
          </td>
        </template>
        <template #montant="{ item }">
          <td>
            {{ montant(item["montant"]) }}
          </td>
        </template>
        <template #dateDecision="{ item }">
          <td>
            {{ date(item['dateDecision']) }}
          </td>
        </template>
        <template #dateCreation-filter>
          Du:
          <input
            type="date"
            :value="startDate"
            @change="setDateFilter"
            class="mr-2"
          /><br>
          Au:
          <input
            type="date"
            :value="endDate"
            @change="(e) => setDateFilter(e, 'end')"
          />
        </template>
      </c-data-table>
      <c-pagination
        :activePage.sync="page"
        :pages="nbPages"
        size='sm'
      />
    </c-card-body>
  </c-card>
</template>

<script>
import { concat, findKey, isEmpty, isNumber, map, mapKeys, pickBy } from 'lodash'
import { query, keyMap, itemsTransform, fields } from '@/assets/queries/opportunites/ligne2'
import { drilldown, loadData } from '@/services/cube'

export default {
  name: 'OpportuniteLigne2',
  data () {
    return {
      loading: false,
      page: 1,
      itemsPerPage: 5,
      nbPages: 0,
      startDate: null,
      endDate: null,
      items: [],
      query,
      keyMap,
      itemsTransform,
      fields,
      filters: [],
      order: {},
      offset: 0
    }
  },
  async created () {
    await this.loadItems(this.query)
  },
  methods: {
    date (val) {
      return (this.$moment.unix(val).isValid()) ? this.$moment.unix(val).format('DD/MM/YYYY') : ''
    },
    montant (val) {
      return (isNumber(val)) ? this.$options.filters.numberFormat(val, '0.00a$') : ''
    },
    async loadItems () {
      this.loading = true
      const query = { ...this.query }
      if (this.filters.length) {
        query.filters = concat(query.filters, this.filters)
      }
      const data = await loadData(query)
      this.nbPages = parseInt(data.sum / this.itemsPerPage)
      const drillQuery = data.resultSet.drillDown({
        xValues: [data.labels[0]],
        yValues: data.values[0]
      })
      drillQuery.limit = this.itemsPerPage
      if (this.offset) drillQuery.offset = this.offset
      const res = await drilldown(drillQuery, this.itemsTransform)
      this.items = map(res, (val) => {
        return mapKeys(val, (value, key) => {
          return this.keyMap[key]
        })
      })
      this.loading = false
    },
    async paginationChange (value) {
      this.itemsPerPage = value
      await this.loadItems()
    },
    async filterChange (filtres) {
      this.filters = map(
        pickBy(filtres, (val, key) => !isEmpty(val)), (val, key) => {
          return {
            member: findKey(keyMap, el => el === key),
            operator: 'contains',
            values: [val]
          }
        }
      )
      await this.loadItems()
    },
    async soterChange (value) {
      const key = findKey(this.keyMap, v => v === value.column)
      const order = {
        [key]: (value.asc) ? 'asc' : 'desc'
      }
      this.filters = concat(this.filters, { member: key, operator: 'set' })
      this.order = order
      await this.loadItems()
    },
    async setDateFilter (e, end) {
      if (end) {
        this.endDate = e.target.value
      } else {
        this.startDate = e.target.value
      }
      if (this.startDate && this.endDate) {
        this.filters = concat(this.filters, {
          member: 'Opportunites.dateCreation',
          operator: 'inDateRange',
          values: [this.startDate, this.endDate]
        })
      }
      await this.loadItems()
    },
    async reset (clean) {
      this.filters = []
      this.order = {}
      this.itemsPerPage = 5
      this.page = 1
      this.offset = 0
      this.startDate = null
      this.endDate = null
      clean()
      await this.loadItems()
    }
  },
  watch: {
    async page (val) {
      this.offset = (val - 1) * this.itemsPerPage
      await this.loadItems()
    }
  }
}
</script>
