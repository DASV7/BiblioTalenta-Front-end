import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swal from "sweetalert2";
import axios from "./api/axios.ts";
import api from "./api/api.ts"


Vue.config.productionTip = false
Vue.prototype.$Swal = Swal;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
