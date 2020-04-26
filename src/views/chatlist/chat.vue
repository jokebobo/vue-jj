<template>
  <div ref="chat" class="main">
    <div class="container-fluid">
      <div class="row">
        <div class="top top1 rela">
          <a class="iconfont icon-jiantou abs backarr" @click="goback"></a>
          <h5>话题讨论</h5>
        </div>
        <div class="chat_inf w100">
          <img :src="chatpic" alt="" class="chat_pic w100">
          <div class="chat_con">
            <h5 class="chat_tit ft36">{{ chattit }}</h5>
            <div class="chat_con2 ft26">
              <p>{{ chatcon }}</p>
            </div>
          </div>
          <!--讨论列表-->
          <div class="hot_chat w100 mb80">
            <h5 class="hot_tit w100">
              <p class="hot_tit2 ft32">精彩评论</p>
            </h5>
            <div class="hot_con">
              <div v-for="chatlist in chatlists" class="hot_item">
                <div class="hot_top w100 ">
                  <div class="hot_user pull-left clearfix">
                    <img :src="chatlist.userhead" alt="" class="hot_head pull-left">
                    <div class="hot_user2 pull-left ml20">
                      <p class="ft26 hot_name">{{ chatlist.hot_name }}</p>
                      <p class="ft24 hot_date">{{ chatlist.hot_date }}</p>
                    </div>
                  </div>
                  <div class="hot_inf pull-right clearfix ft24 mt11">
                    <p
                      :class="['pull-right','agr_num','ml30',chatlist.iszan?'agr_on':'agr_off']"
                      @click="chatlist.iszan=!chatlist.iszan;chatlist.iszan?chatlist.agr_num++:chatlist.agr_num--"
                    >
                      {{ chatlist.agr_num }}</p>
                    <p class="pull-right rec_num" @click="showReply(chatlist)">{{ chatlist.rec_num }}</p>
                  </div>
                </div>
                <div v-if="chatlist.ori_con!=''" class="ori ft24 mt15">
                  <p class="ells">{{ chatlist.ori_name }}：{{ chatlist.ori_con }}</p>
                </div>
                <com :class="['hot_com','ft26','mt9']" :hot_com="chatlist.hot_com"></com>

                <div class="com_pho clearfix mt21">
                  <img
                    v-for="(picarr,index) in chatlist.picarrs"
                    :src="picarr"
                    alt=""
                    :class="['com_pho_item',index==0?'ml0':'']"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat_btn fix w100" @click="isfabu=!isfabu"></div>
        <div v-show="isshow" class="reply_con w100 fix" @click.self="showReply">
          <transition name="slideup">
            <div v-if="isshow" class="reply_con2 abs w100">
              <form id="reply_form" action="">
                <input
                  id="reply_con"
                  v-model="newval"
                  type="text"
                  class="reply_inp w100 ft26 boxsize"
                  placeholder=" 发表你的高见..."
                >
                <input type="button" class="rep_sub" value="发送" @click="reply">
                <input id="ori_con" type="hidden">
                <input id="ori_name" type="hidden">
              </form>
            </div>
          </transition>
        </div>
        <!--富文本编辑框-->
        <div v-show="isfabu" class="fabu_box fix">
          <form>
            <div class="top top1 rela">
              <a class="cancel abs" @click="isfabu=!isfabu">取消</a>
              <h5>参与讨论</h5>
              <input type="button" class="fabu abs" value="发布" @click="subChat">
            </div>
            <div class="fabu_con">
              <div class="fabu_con2" contenteditable="true" @input="onInpDiv($event)" v-html="chatRec" />
              <form ref="upbox" method="POST" enctype="multipart/form-data" @submit="uploadPho">
                <div class="picbox w100 clearfix">
                  <!-- 点击上传图标触发上传事件 -->
                  <div id="uphint" class="uphint" style="float:left" @click="uppic" />
                  <input
                    ref="upbtn"
                    type="file"
                    name="uploadImg"
                    multiple="multiple"
                    style="float:left;display:none"
                    @change="getpic"
                  >
                  <input id="picarr" type="hidden">
                </div>
                <div class="picbox w100 clearfix">
                  <div
                    v-for="(uparr,index) in uparrs"
                    :class="['outbox','rela','mt30',index==0?'':'ml30']"
                    style="float:left;"
                  >
                    <div class="phobox rela">
                      <img class="abs" :src="uparr">
                    </div>
                    <span class="close abs iconfont icon-guanbi" @click="removePho(index)" />
                  </div>
                </div>
              </form>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="bigpic">
      <span class="iconfont icon-jiantouarrowhead7 abs backarr" />
      <div id="swiper1" class="swiper-container banner swiper1">
        <div class="swiper-wrapper">
          <swiper-slide v-for="bigarr in bigarrs">
            <img src="">
          </swiper-slide>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  @import '~@/assets/css/bootstrap.min.css';
  @import '~@/assets/css/all.css';
  @import '~@/assets/css/chat_det.css';
  @import '~@/assets/iconfont/iconfont.css';
</style>
<style scoped>
  /* 组件内部作用的样式 */
  .hot_top,
  .hot_top .hot_user,
  .hot_top .hot_user .hot_user2 {
    height: 65px;
  }
</style>
<style lang="postcss" scoped>
  .backarr {
    transform: rotate(0deg);
  }
</style>
<script>

import '~@/assets/js/bootstrap.min.js'
import com from './com.vue'
import { chatlist } from '~@/apis/express'
import {getToken} from '~@/utils/auth'
import {mapState,mapMutations,mapActions} from 'vuex'
import store from '~@/store/index.js'
/* require("../../mock/mock.js") */

export default {
  name: 'Chat',
  components: {
    com
  },
  props:['id'],
  data: function() {
    return {
      chattit: '',
      chatcon: '',
      bigarrs: [],
      chatlists: [],
      chatpic: '',
      isshow: false,
      newval: '',
      recid: -1,
      item_id: 0,
      recobj: null,
      pl_id: 0,
      pl_relid: 0,
      isfabu: false,
      uparrs: [],
      chatRec: '',
      page: 0
    }
  },
  fetchData(){
    //异步函数
    const p=new Promise(function(resolve,reject){
      store.dispatch('incrementAsync',{addnum:5});
      resolve();
    })
    return p
    
  },
  computed:{
    ...mapState({
      count:state=>state.count,
      chatId:state=>state.chatId,
      userinfo:state=>state.userinfo
    })
  },
  beforeCreate:function(){
    //在组件创建之前
    //判断用户是否已经登录
    
  },
  created: function() {
    //组件已经创建
    //判断用户是否已经登录
    console.log("进入当前页面");
    console.log("count",this.count);
    console.log("路由信息",this.$router)
    var _this = this
    var id = this.id
    this.item_id = id
    //将当期页面参数 id 记录在vuex
    this.setChatId({id});
    console.log("chatId",this.chatId)
    var page = this.page
    console.log(id)
    chatlist({
      id: id
    }).then(function(res) {
      console.log(res)
      const chatdata = res.data[0]
      _this.chattit = chatdata['tit']
      _this.chatcon = chatdata['chatcon']
      _this.chatpic = chatdata['pic']
      _this.hot_com=chatdata['hot_com']
    }).catch(function(error) {
      console.log(error)
    })

    this.$axios.post('/list', {
      id: id,
      recobj: _this.recobj,
      newval: _this.newval,
      size: 5,
      page: page
    })
      .then(function(res) {
        const chatdata = res.data[0]
        console.log('list', chatdata)
        _this.pl_id = chatdata._id
        var pinglun = []
        chatdata['pinglun'].forEach(element => {
          const ele = { ...element, iszan: false }
          pinglun.push(ele)
        })
        console.log(pinglun)
        _this.chatlists = pinglun
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  destroyed:function(){
    console.log("this is destroyed");
  },
  mounted: function() {
    this.$store.commit('increment', { num: 1 })
    console.log('store', this.$store.state.count)
  },

  beforeRouteEnter (to, from, next){
    //进入页面之前判断是否登录
    /* console.log("进入chat页面");
    console.log(from);
    
      console.log("进入页面了");
      console.log(from);
      var token=getToken();
      console.log("token",token);
      if(token){
        //已登录
        console.log("已登录")
        next();
      }else{
        //未登录
        console.log("未登录")
        next({path:'/login'})
      } */
    
    next();
  },
  methods: {
    ...mapMutations([
      'setChatId',
      'setUser'
    ]),
    ...mapActions([
      'incrementAsync'
    ]),
    goback: function() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
        
    },
    setdata: function(key, arr, value) {
      return this.serdata(key, arr, value)
    },
    showReply: function(recobj) {
      const isshow = this.isshow
      this.isshow = !isshow
      if (recobj != null) {
        this.recobj = recobj
        this.pl_relid = recobj._id
      }
    },
    reply: function() {
      const _this = this
      const newval = this.newval
      // id是设置的每个话题的id,_id是随机生成的每个话题的_id
      this.$axios.post('/list', {
        id: _this.item_id,
        _id: _this.pl_id,
        rel_id: _this.pl_relid,
        newval: newval,
        recobj: _this.recobj
      }).then(function(res) {
        console.log(res)
        const chatdata = res.data
        _this.addcom(chatdata)
        const isshow = _this.isshow
        _this.isshow = !isshow
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    uppic: function() {
      this.$refs.upbtn.click()
    },
    getpic: function(e) {
      // 上传图片回显,已实现一个图片上传返回路径
      var _this = this
      var f = e.target.files
      console.log(f)
      const formdata = new FormData()
      for (let i = 0; i < f.length; i++) {
        formdata.append('file', f[i], f[i].name)
      }
      console.log(formdata)

      this.$axios.post('/uppic', formdata,
        {
          'Content-Type': 'multipart/form-data;'
        })
        .then(function(res) {
          console.log(res)
        })
        .catch(function() {
          console.log(error)
        })
        // this.$refs.upbox.submit();// 触发upload事件
        /* for (let i = 0; i < f.length; i++) {
          var reader = new FileReader();
          reader.readAsDataURL(f[i]);
          reader.onload = function (e) {
            _this.uparrs.push(e.target.result);
          }
        } */
    },
    removePho: function(index) {
      // 删除上传图片
      this.uparrs.splice(index, 1)
    },
    onInpDiv: function(e) {
      // 获取contenteditable的元素的值
      this.chatRec = e.target.innerHTML
    },
    subChat: function() {
      // 发布评论
      const chatRec = this.chatRec
      const uparrs = this.uparrs
      const hot_name=this.userinfo.name;

      const _this = this;
      this.$axios.post('/list', {
        id: _this.item_id,
        _id: _this.pl_id,
        newRec: { hot_name: hot_name, userhead: '', hot_date: '', hot_com: chatRec, ori_con: '', uparrs: [], rec_num: 0, agr_num: 0 }
      }).then(function(res) {
        console.log(res)
        const chatdata = res.data
        _this.addcom(chatdata)
        _this.isfabu = false
        return false
      }).catch(function(error) {
        console.log(error)
        return false
      })
    },
    addcom: function(chatdata) {
      // 增加评论
      var _this = this
      var pinglun = []
      chatdata['pinglun'].forEach(element => {
        const ele = { ...element, iszan: false }
        pinglun.push(ele)
      })
      console.log(pinglun)
      _this.chatlists = pinglun
    },
    uploadPho: function(e) {
      console.log(e)
      /* let param = new FormData();
        param.
          this.$axios.post('/uppic', param,
            {
              'Content-Type': 'multipart/form-data;'
            })
          .then(function (res) {
            console.log(res);
          })
          .catch(function () {
            console.log(error);
          }) */
    },
    lazyload: function() {
      var _this = this
      var page = this.page
      this.$axios.post('/list', {
        id: id,
        recobj: _this.recobj,
        newval: _this.newval,
        size: 5,
        page: page
      })
        .then(function(res) {
          const chatdata = res.data[0]
          console.log('list', chatdata)
          _this.pl_id = chatdata._id
          _this.addcom(chatdata)
          console.log(pinglun)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}

</script>
