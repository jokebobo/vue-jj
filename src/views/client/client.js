import Vue from 'vue'
import client from './client.vue'
//import router from '../../router'
//router,
import router from '../../router/test'
import store from '../../store/index'
new Vue({
  router,
  store,
  render: h => h(client),
  mounted: function () {
    console.log("this is client is mounted");
  }
}).$mount("#client")