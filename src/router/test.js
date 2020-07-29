//
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
let routes = [
  // {
  //   path: '/',
  //   name: '/',
  //   components: {
  //     default: () => import('../views/client/foo.vue'),
  //     a: () => import('../views/client/a.vue'),
  //     b: () => import('../views/client/b.vue')
  //   }
  // },
  {
    path: '/second',
    name: "home",
    component: () => import('../views/client/a.vue')
  },
  {
    path: '/test',
    name: 'index',
    components: {
      default: () => import('../views/client/foo.vue'),
      a: () => import('../views/client/a.vue'),
      b: () => import('../views/client/b.vue')
    }
  },
  {
    path: '*',
    component: () => import('../views/404/notfound.vue')
  }
]
const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router;