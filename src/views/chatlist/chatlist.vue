<template>
  <div ref="main" class="main" @scroll="toend">
    <div ref="main2" class="container-fluid">
      <div class="row">
        <div class="top top1 rela">
          <a href="javascript:history.back(-1)" class="iconfont icon-jiantou abs backarr" />
          <h5>话题讨论</h5>
        </div>
        <div class="chat_list w100 mt40">
          <div class="chat_con w100">
            <div v-for="chatarr in chatarrs" class="chat_item w100 boxsize clearfix">
              <keep-alive>
                <router-link :to="{name:'chat',params:{id:chatarr.id}}" :data-id="chatarr.id" @click="recId">
                  <div class="chat_lef pull-left">
                    <h5 class="chat_tit ft32 ells">{{ chatarr.tit }}</h5>
                    <p class="chat_num ft22">{{ chatarr.num }}人参与讨论</p>
                  </div>
                  <div class="chat_rig pull-right flex">
                    <a href="" class="flex">
                      <img :src="logo" alt="" class="chat_logo">
                      <p class="chat_hint ft24 mt15">参与讨论</p>
                    </a>
                  </div>
                </router-link>
  
              </keep-alive>
              
            </div>
          </div>
        </div>
        <div v-show="isdone" class="com_hint mt15">
          已全部加载完毕
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  @import '~@/assets/css/bootstrap.min.css';
  @import '~@/assets/iconfont/iconfont.css';
  @import '~@/assets/css/all.css';
  @import '~@/assets/css/chat_list.css';
</style>
<!-- 当前组件内部样式 -->
<style scoped>
  .hot_chat .hot_con .hot_item .hot_com {
    height: 90px;
  }

  .main {
    height: 100%;
    overflow: auto;
  }
</style>
<script>
import {mapState,mapMutations} from 'vuex'
import '../../assets/js/bootstrap.min.js'
require('../../mock/mock.js')
import store from '~@/store/index.js'
//const api = require('../.././apis/api')
export default {
  name: 'Chatlist',
 
  data: function() {
    return {
      logo: require('../../assets/chat_hint.png'),
      chatarrs: [],
      size: 6,
      page: 0,
      isdone: false
    }
  },
  fetchData(){
    //异步函数
    var _this=this;
    return new Promise((resolve,reject) => {
      store.dispatch('incrementAsync',{addnum:5});
      resolve();
    })
    
    
  },
  created: function() {
    //created在beforeResolve之后执行
    console.log("state为",this.count)
    const page = this.page
    this.lazyload(page)
  },
  computed:{
    ...mapState({
      chatId:state=>state.chatId,
      count:state=>state.count
    })
  },
  methods: {
    ...mapMutations([
      'setChatId'    
    ]),
    recId:function(e){
      console.log("当前路由组件",e);
      console.log("获取当前组件ID",);
      //this.setChatId({id:})
    },
    toend: function() {
      if (this.$refs.main.scrollTop + this.$refs.main.offsetHeight >= (this.$refs.main2.offsetHeight - 100)) {
        let page = this.page
        page++
        this.throttle(this.lazyload(page), 500)
      }
    },
    lazyload: function(page) {
      var _this = this
      const size = this.size
      if (!this.isdone) {
        // 当加载完成后滚动到底不再请求数据
        this.$axios.post('/chatlist', {
          id: -1,
          size: size,
          page: page
        }).then(function(res) {
          console.log('chatlist', res)
          if (res.data.length != 0) {
            let chatarrs = _this.chatarrs
            chatarrs = chatarrs.concat(res.data)
            console.log(chatarrs)
            _this.chatarrs = chatarrs
          } else {
            console.log('加载完成')
            _this.isdone = true
          }
          _this.page = page
        }).catch(function(error) {
          console.log(error)
        })
      }
    },
    throttle: function(func, delay) {
      // 节流函数
      var timer = null
      return function() {
        var context = this
        var args = arguments
        if (!timer) {
          timer = setTimeout(function() {
            func.apply(context, args)
            timer = null
          }, delay)
        }
      }
    }
  },
  beforeRouteLeave(to,from,next){
    console.log("chatlist离开当前页面",from);
    console.log("chatlist目标页面",to)
    this.setChatId({id:to.params.id});
    next();
  }
  /* beforeRouteLeave (to, from, next) {
     console.log("离开当前页面");
    if(to.name=="chat"){
      console.log("离开chatlist页面了");
      console.log(to);
      
      this.setChatId({id:to.params.id});
      console.log("页面参数为",this.chatId);
      next();
    }else{
      next();
    } 
    
  } */
}
</script>
