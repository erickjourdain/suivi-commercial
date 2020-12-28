import Vue from 'vue'
import numeral from 'numeral'
import numFormat from 'vue-filter-number-format'

numeral.register('locale', 'fr', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'M',
    trillion: 'Md'
  },
  ordinal: function (number) {
    return (number === 1) ? 'er' : 'ème'
  },
  currency: {
    symbol: '€'
  }
})

numeral.locale('fr')

Vue.filter('numberFormat', numFormat(numeral))
