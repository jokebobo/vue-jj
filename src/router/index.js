//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Tem from '../views/index/tem.vue'
import hotact from '../views/index/hotact.vue'
import chatlist from '../views/chatlist/chatlist.vue'
import chat from '../views/chatlist/chat.vue'
import meitu from '../views/meitu/meitu.vue'
import store from '../store/index.js'
import {getToken} from '~@/utils/auth'
Vue.use(VueRouter)

const routes = [
  {
    path:'/index',
    name:'Home',
    component:Tem
  },
  {
    path:'/hotact/:id',
    name:'hotact',
    component:hotact,
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/chatlist',
    name:'chatlist',
    component:chatlist
  },
  {
    path:'/chat/:id',
    name:'chat',
    component:chat,
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/meitu',
    name:'meitu',
    component:meitu
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login/login.vue')
  },
  {
    path:'*',
    name:'notfound',
    component:()=>import('../views/404/notfound.vue')
  }
]

const router = new VueRouter({
<<<<<<< HEAD
  mode: 'history',
=======
  mode: 'hash',
>>>>>>> d9819eb8e042a5f5bbf36dae2793183d219508a4
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to,from,next)=>{
  console.log("目标页面",to)
  console.log("来源页面",from)
  //当前路由匹配的组件数组
  const matched=router.getMatchedComponents(to);
  const prematched=router.getMatchedComponents(from);
  console.log(matched);
  var fetchArr=[];
  matched.map((r)=>{
    if(r.fetchData){
<<<<<<< HEAD
      console.log(r.fetchData);
      const fetchData=r.fetchData();
      fetchArr.push(fetchData);
=======
      fetchArr.push(r.fetchData());
>>>>>>> d9819eb8e042a5f5bbf36dae2793183d219508a4
    }
  }) 
  console.log("异步函数数组",fetchArr)
  //组件里所有异步执行完毕
  Promise.all(fetchArr).then(function(){
    console.log("执行完毕",store.count);
    next();
  })
  /* matched[0].fetchData().then() */
  console.log(prematched);
  //next();
})

//全局路由导航守卫 判断是否登录
router.beforeEach((to,from,next) => {
  if(to.matched.some(record=>record.meta.requireAuth)){
    //需要用户授权
    var token=getToken("loginToken098");
    if(!token){
      next({
        path:'/login'
      })
    }else{
      next()
    }

  }else{
    next()
  }
})
router.onError=function(){
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
}
export default router
