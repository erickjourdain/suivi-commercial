import Vue from 'vue'
import './plugins/vue-coreui'
import './plugins/vue-moment'
import './plugins/vue-numeral-filter'
import { iconsSet as icons } from './assets/icons/icons.js'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount('#app')
