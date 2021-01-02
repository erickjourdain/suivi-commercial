import { concat, filter, find, findIndex, findKey, forOwn, isEmpty, isNumber, keys, map, mapKeys } from 'lodash'
import { drilldown, loadData } from '@/services/cube'

export const tableauMixin = {
  // chargement des données à la création de la page
  async created () {
    await this.loadItems(this.query)
  },
  methods: {
    // transformation des dates pour affichage au format 'DD/MM/YYYY' dans le tableau
    date (val) {
      return (this.$moment.unix(val).isValid()) ? this.$moment.unix(val).format('DD/MM/YYYY') : ''
    },
    // transformtaion des montants pour affichage au format 0,00k€ dans le tableau
    montant (val) {
      return (isNumber(val)) ? this.$options.filters.numberFormat(val, '0.00a$') : ''
    },
    // date pour affichage dans le filtre
    filtreDate (key, type) {
      const date = find(this.dateFilters, { key })
      return date ? date[type] : null
    },
    // chargement des données
    async loadItems () {
      this.loading = true //                                            chargement en cours
      const query = { ...this.query } //                                création de la varaibel pour modification de la requête de chargement
      if (this.filters.length) { //                                     ajout des filtres
        query.filters = concat(query.filters, this.filters)
      }
      const data = await loadData(query) //                             chargement de la requête principale pour obtention du nombre total de lignes
      this.nbPages = parseInt(data.sum / this.itemsPerPage) //          définition du nombre de pages
      const drillQuery = data.resultSet.drillDown({ //                  cration de la requête de drilldown
        xValues: [data.labels[0]],
        yValues: data.values[0]
      })
      drillQuery.limit = this.itemsPerPage //                           nombre d'enregistrements à retourner
      if (this.offset) drillQuery.offset = this.offset //               ajout d'un offset
      if (!isEmpty(this.order)) drillQuery.order = this.order //        ajout de l'ordre de tri
      const res = await drilldown(drillQuery, this.itemsTransform) //   chargement des données
      this.items = map(res, (val) => { //                               changement des clefs pour affichage dans le tableau
        return mapKeys(val, (value, key) => {
          return this.keyMap[key]
        })
      })
      this.loading = false //                                           fin du chargement
    },
    // changement du nombre d'enregistrements par par page à retourner
    async paginationChange (value) {
      this.itemsPerPage = value
      await this.loadItems()
    },
    // changement d'un filtre
    async filterChange (filtres) {
      this.filters = filter(this.filters, val => val.operator !== 'contains') //        suppression des filtres existants
      forOwn(filtres, (val, key) => { //                                                itération sur les nouveaux filtres
        this.filters = concat(this.filters, { //                                        ajout des nouveaux filtres
          member: findKey(this.keyMap, el => el === key),
          operator: 'contains',
          values: [val]
        })
      })
      await this.loadItems()
    },
    // changement de l'état du tri
    async soterChange (value) {
      this.filters = filter(this.filters, val => { //                                   suppression du filtre précédement inséré
        return val.member !== keys(this.order)[0] && val.operator !== 'set'
      })
      if (value.column === null) { //                                                   remise à zéro de l'ordre de tri
        this.order = {} //                                                              réinitialisation du tri
      } else {
        const key = findKey(this.keyMap, v => v === value.column) //                    recherche de la clef du champ à trier
        this.order = { [key]: (value.asc) ? 'asc' : 'desc' } //                         définition du tri
        this.filters = concat(this.filters, { member: key, operator: 'set' }) //        ajout d'un filtre indiquant que le champ doit exister
      }
      await this.loadItems()
    },
    // changement d'un filtre sur les dates
    async setDateFilter (e, type, key) {
      const date = e.target.value //                                                                      extraction de la date fournie
      if (!this.$moment(date).isValid()) return //                                                        test du format de date fourni
      let ind = findIndex(this.dateFilters, { key }) //                                                   recherche de l'existence du filtre
      if (type === 'end') {
        (ind >= 0) ? this.dateFilters[ind].end = date : this.dateFilters.push({ key, end: date }) //      modification du filtre s'il existe, création sinon
      } else {
        (ind >= 0) ? this.dateFilters[ind].start = date : this.dateFilters.push({ key, start: date })
      }
      if (ind === undefined) ind = findIndex(this.dateFilters, { key }) //                                recherche de l'indice du filtre si nouveau
      if (ind === undefined || ind < 0) return
      if (this.dateFilters[ind].end && this.dateFilters[ind].start) { //                                  si date de début et date de fin renseignés ajouter le filtre
        const filtre = { //                                                                               définition du filtre à insérer
          member: findKey(this.keyMap, (e) => e === key),
          operator: 'inDateRange',
          values: [this.dateFilters[ind].start, this.dateFilters[ind].end]
        }
        const i = findIndex(this.filters, { member: filtre.member, operator: filtre.operator }) //        recherche de l'existence du filtre
        if (i === undefined) this.filters = concat(this.filters, filtre) //                               ajout du nouveau filtre dans le tableau des filtres
        else this.filters.splice(i, 1, filtre) //                                                         remplacement du filtre existant
      }
      await this.loadItems()
    },
    // remise à zéro du tableau
    async reset () {
      this.filters = []
      this.order = {}
      this.itemsPerPage = 5
      this.page = 1
      this.offset = 0
      this.dateFilters = []
      await this.loadItems()
    }
  },
  watch: {
    // changement de page
    async page (val) {
      this.offset = (val - 1) * this.itemsPerPage
      await this.loadItems()
    }
  }
}
