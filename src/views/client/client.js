import Vue from 'vue'
import client from './client.vue'
<<<<<<< HEAD
//import router from '../../router'
import store from '../../store/index'
new Vue({
    //router,
=======
import router from '../../router'
import store from '../../store/index'
new Vue({
    router,
>>>>>>> d9819eb8e042a5f5bbf36dae2793183d219508a4
    store,
    render: h => h(client),
    mounted:function(){
        console.log("this is client is mounted");
    }
}).$mount("#client")