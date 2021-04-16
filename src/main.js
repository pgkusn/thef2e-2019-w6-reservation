import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './plugins/iview.js'
import '@/assets/sass/reset.scss'; // override iview.css
import '@/assets/sass/all.scss'; // override iview.css

Vue.config.productionTip = false

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
