// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
Vue.use(axios)

import VModal from 'vue-js-modal'
Vue.use(VModal)

var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)

import "@/assets/style.css"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})