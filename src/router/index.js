//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import { getToken } from '~@/utils/auth'
Vue.use(VueRouter)
// props传参 页面接受参数
const routes = [
  {
    path: '/index',
    name: 'Home',
    component: () => import('../views/index/tem.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/hotact/:id',
    name: 'hotact',
    component: () => import('../views/index/hotact.vue'),
    meta: {
      requireAuth: true
    },
    props: (route) => ({
      id: route.params.id
    })
  },
  {
    path: '/chatlist',
    name: 'chatlist',
    component: () => import('../views/chatlist/chatlist.vue'),
    props: true
  },
  {
    path: '/chat/:id',
    name: 'chat',
    component: () => import('../views/chatlist/chat.vue'),
    meta: {
      requireAuth: true
    },
    props: (route) => ({
      id: route.params.id
    })
  },
  {
    path: '/meitu',
    name: 'meitu',
    component: () => import('../views/meitu/meitu.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    props: true
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import('../views/404/notfound.vue'),
    props: true
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  console.log("目标页面", to)
  console.log("来源页面", from)
  //当前路由匹配的组件数组
  const matched = router.getMatchedComponents(to);
  const prematched = router.getMatchedComponents(from);
  console.log(matched);
  var fetchArr = [];
  matched.map((r) => {
    if (r.fetchData) {
      console.log(r.fetchData);
      const fetchData = r.fetchData();
      fetchArr.push(fetchData);
    }
  })
  console.log("异步函数数组", fetchArr)
  //组件里所有异步执行完毕
  Promise.all(fetchArr).then(function () {
    console.log("执行完毕", store.count);
    next();
  })
  /* matched[0].fetchData().then() */
  console.log(prematched);
  //next();
})

//全局路由导航守卫 判断是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    //需要用户授权的组件 判断是否已经授权
    var token = getToken("loginToken098");
    if (!token) {
      next({
        path: '/login'
      })
    } else {
      next()
    }

  } else {
    next()
  }
})
router.onError = function () {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
}
export default router
