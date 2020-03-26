<template>
  <div id="meitu" ref="meitu" style="height:100%" @scroll="toend">
    <div class="container-fluid">
      <div class="row">
        <div class="top top1 rela">
          <a class="iconfont icon-jiantou abs backarr" @click="goback" />
          <h5>装修美图</h5>
        </div>
        <!--切换tab start-->
        <div class="nav_box col-xs-12 pad0">
          <ul class="nav col-xs-12 pad0">
            <li v-for="(tab,index) in tabs" class="col-xs-3 pad0 center" @click="tabchg(index)">
              <p class="inline">
                {{ tab.tabname }}
                <span :class="['arr_up','iconfont','icon-arrow-up',tabcho==index?'':'none']" />
                <span :class="['arr_down', 'iconfont', 'icon-arrow-down',tabcho==index?'none':'']" />
              </p>
            </li>
          </ul>
          <div v-show="tabcho!=-1" class="nav_tab col-xs-12 pad0 ft24" :style="{height:cal_h+'px'}">
            <div v-for="(tab,index) in tabs" v-show="tabcho==index" class="nav_list col-xs-12 boxsize">

              <span
                v-for="(navlist,index) in tab.navlists"
                :class="[tab.cho==index?'tab_cho':'']"
                @click="navchg(index)"
              >{{ navlist }}</span>
            </div>
          </div>
        </div>
        <!--搜索框-->
        <div class="inp_pic col-xs-12">
          <input
            type="text"
            placeholder="美图名称"
            value=""
            readonly="readonly"
            class="boxsize ft26"
            @click="isSearch=!isSearch"
          >
        </div>
        <!--图片列表-->
        <div ref="piclist" class="pic_list col-xs-12">
          <div class="pic_con col-xs-12 pad0">
            <ul class="col-xs-12 pad0 ft24">
              <li v-for="piclist in piclists" class="boxsize">
                <div class="pic_item">
                  <a href="">
                    <img :src="piclist.img" alt="">
                    <div class="boxsize pic_name">{{ piclist.name }}</div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div v-show="isend" class="com_hint col-xs-12">
            已全部加载完毕
          </div>
        </div>
      </div>
    </div>

    <div v-show="isSearch" class="ser_inf clearfix abs">
      <div class="top top1 rela">
        <a class="iconfont icon-jiantou abs backarr" @click="isSearch=!isSearch" />
        <h5>美图搜索</h5>
      </div>
      <div class="ser_main col-xs-12">
        <div class="ser_group clearfix rela">
          <input
            id="ser_pic"
            v-model="serkey"
            type="text"
            class="pull-left ft26"
            placeholder="美图名称"
            autofocus="autofocus"
            @enter="serPic"
            @input="fuzSer"
          >
          <a class="pull-left iconfont icon-sousuo1 ser_btn" @click="serPic" />
          <ul v-show="isfuz" class="abs ft26">
            <li v-for="serlist in serlists" @click="choseKey(serlist.name)">{{ serlist.name }}</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<style>
  @import '~@/assets/css/bootstrap.min.css';
  @import '../../../node_modules/swiper/css/swiper.css';
  @import '~@/assets/iconfont/iconfont.css';
  @import '~@/assets/css/all.css';
  @import '~@/assets/css/nav.css';
  @import '~@/assets/css/index.css';
  @import '~@/assets/css/pic_list.css';
</style>
<style scoped>
  #meitu {
    overflow-y: auto;
  }

  .nav {
    height: 70px;
  }

  .nav_box {
    position: fixed;
    left: 0;
    top: 82px;
  }

  .top {
    position: fixed;
    left: 0;
    top: 0;
  }

  .inp_pic {
    margin-top: 155px;
  }
</style>
<script>

export default {
  name: 'Meitu',
  components: {

  },
  data: function() {
    return {
      tabs: [
        {
          'tabname': '类型',
          'navlists': [
            '住宅', '公寓', '别墅', '其他'
          ],
          'cho': -1
        },
        {
          'tabname': '功能',
          'navlists': [
            '客厅', '厨房', '卧室', '卫生间', '玄关', '餐厅', '阳台', '儿童房', '衣帽间', '书房'
          ],
          'cho': -1
        },
        {
          'tabname': '风格',
          'navlists': [
            '现代', '简欧', '简约', '中式', '欧式', '田园', '地中海', '混搭', '美式', '日韩', '东南亚', '古典', '北欧'
          ],
          'cho': -1
        },
        {
          'tabname': '局部',
          'navlists': [
            '背景墙', '飘窗', '走廊', '吊顶', '楼梯', '橱窗', '衣柜', '床', '电视柜', '沙发', '窗帘', '隔断', '组合柜',
            '储物柜', '书柜', '吧台', '鞋柜', '茶几', '榻榻米', '照片墙', '壁纸', '屏风', '婴儿床', '灯具', '餐桌',
            '浴缸', '床头柜', '酒柜', '梳妆台', '书架'
          ],
          'cho': -1
        }
      ],
      tabcho: -1,
      cal_h: 0,
      piclists: [

      ],
      isload: true,
      times: 0,
      recpar: {},
      isend: false,
      param: {
        type: 0,
        fun: 0,
        style: 0,
        part: 0
      },
      isSearch: false,
      serkey: '',
      serlists: [],
      isfuz: false
    }
  },
  computed: {
  },
  mounted: function() {
    this.$store.commit('increment', { num: 5 })
    console.log(this.$store.state.count)
    this.cal_h = $('body,html').height() - $('.top').height() - $('.nav_box').height()
    this.lazyload(-1)
  },
  methods: {
    choseKey: function(value) {
      // 模糊查询选择选项显示对应内容
      this.serkey = value
      this.isfuz = false
    },
    serPic: function() {
      // 实现关键词标题查询
      const serkey = this.serkey
      const _this = this
      _this.$axios.post('/pic', {
        serkey: serkey,
        times: 0
      })
        .then(function(res) {
          console.log(res.data)
          _this.piclists = res.data
          _this.isSearch = false
          this.times = 1
        })
        .catch(function() {

        })
    },
    fuzSer: function() {
      // 实现模糊查询
      const serkey = this.serkey
      const _this = this
      this.$axios.post('/pic', {
        serkey: serkey
      }).then(function(res) {
        if (res.data.length >= 0) {
          _this.serlists = res.data
          _this.isfuz = true
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    tabchg: function(ind) {
      if (ind == this.tabcho) {
        this.tabcho = -1
      } else {
        this.tabcho = ind
      }
    },
    navchg: function(ind) {
      // 点击切换tab
      this.lazyload(ind)
      this.serkey = undefined
      console.log('999')
    },
    toend: function() {
      // this是指的当前组件,$ref获取的元素只能调用原生js的方法
      /* if(this.$refs.com[ind].scrollTop>this.$refs.com[ind].) */

      const _this = this
      var innH = this.$refs.piclist.offsetHeight
      var isload = this.isload
      let times = this.times
      const param = this.recpar
      const piclists = this.piclists
      let params = {}
      const serkey = _this.serkey
      console.log(isload)
      if (this.$refs.meitu.scrollTop + this.$refs.meitu.offsetHeight - 210 >= innH - 50) {
        if (isload) {
          console.log('isend')
          _this.isload = false
          if (serkey) {
            params = {
              serkey: serkey, times: times
            }
          } else {
            params = {
              ...param, times: times
            }
          }
          if (!this.isend) {
            _this.$axios.post('/pic', params)
              .then(function(res) {
                console.log('data', res)
                if (res.data.length != 0) {
                  _this.piclists = piclists.concat(res.data)
                  times++
                  _this.times = times
                } else {
                  console.log('到底了')
                  _this.isend = true
                }

                _this.isload = true
              })
              .catch(function() {

              })
          }
        }
      } else {

      }
    },
    lazyload: function(ind) {
      // 记录tabs所有内容
      var tabs = this.tabs
      if (ind != -1) {
        // 传递当前点击的下标，改变样式
        tabs[this.tabcho].cho = ind
      }
      this.tabs = tabs
      // 一级tab下标
      var tab = this.tabcho
      var param = this.param
      var _this = this
      var times = 0
      this.isend = false
      if (tab == 0) {
        param['type'] = ind + 1
      } else if (tab == 1) {
        param['fun'] = ind + 1
      } else if (tab == 2) {
        param['style'] = ind + 1
      } else if (tab == 3) {
        param['part'] = ind + 1
      }
      // 点击标签的时候传递不同的参数
      this.$axios.post('/pic', {
        ...param, times: times
      }).then(function(res) {
        console.log(res)
        _this.isload = true
        _this.piclists = res.data
        times++
        _this.times = times
        _this.recpar = param
        if (res.data.length < 10) {
          console.log('到底了')
          _this.isend = true
        }
        var load = setTimeout(function() {
          _this.tabcho = -1
        }, 500)
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    goback: function() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>
