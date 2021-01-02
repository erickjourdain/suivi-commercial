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
            @click="(e) => { reset(); clean() }"
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
            :value="filtreDate('dateCreation', 'start')"
            @change="(e) => setDateFilter(e, 'start', 'dateCreation')"
            class="mr-2"
          /><br>
          Au:
          <input
            type="date"
            :value="filtreDate('dateCreation', 'end')"
            @change="(e) => setDateFilter(e, 'end', 'dateCreation')"
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
import { tableauMixin } from '@/components/mixins/tableau'
import { query, keyMap, itemsTransform, fields } from '@/assets/queries/opportunites/ligne2'

export default {
  name: 'OpportuniteLigne2',
  data () {
    return {
      loading: false, //    etat sur le chargement des données
      page: 1, //           page active
      itemsPerPage: 5, //   nombre de lignes par page
      nbPages: 0, //        nombre total de pages
      dateFilters: [], //   tableau des filtres calendaire
      items: [], //         tableau des données
      query, //             requête pour le chargement des données
      keyMap, //            objet de transformation des clefs pour affichage des titres
      itemsTransform, //    objet de fonctions pour la transformation des données
      fields, //            objet définissant les colonnes à afficher et leur structure
      filters: [], //       tableau des filtres à appliquer pour la recherche des données
      order: {}, //         objet définissant l'ordre d'affichage des données
      offset: 0 //          offset à appliquer pour afichage d'une page spécifique
    }
  },
  mixins: [tableauMixin]
}
</script>
