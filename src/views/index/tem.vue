<template>
  <div class="container-fluid" @click="closepop">
    <div class="row">
      <div class="top">
        <h5>家居</h5>
      </div>
      <!--�ֲ�ͼstart-->
      <div class="ban_box">
        <swiper class="swiper-container banner swiper1" :options="swiperOption">
          <swiper-slide v-for="banarr in banarrs" class="swiper-slide">
            <a :href="banarr.href" target="_blank">
              <img :src="banarr.img" alt="">
            </a>
          </swiper-slide>
          <div id="swp1_pag" slot="pagination" class="pagination swp1_pag" />
        </swiper>
      </div>
      <!--�ֲ�ͼend-->

      <div class="main_top clearfix">
        <!--菜单start-->
        <div class="nav clearfix">
          <div v-for="(nav,index) in navs"
            :class="['boxsize','nav_item','ft26',index%5==0?'ml0':'',index==linkchose?'linkcol':'']">
            <router-link :to="nav.href" class="flex" @click="tolink(index)">
              <img :src="nav.icon" alt="">
              <p>{{ nav.title }}</p>
            </router-link>
          </div>
        </div>
        <!--菜单end-->
        <!--三个功能nav start-->
        <div class="col-xs-12 fun_nav mt35">
          <div class="col-xs-6 pad0 boxsize fun_nav_lef pr12">
            <div class="col-xs-12 pad0 fun_nav_item des">
              <a href="lf.html" class="boxsize">
                <h5>
                  免费设计<span class="nav_hint" />
                </h5>
                <p>省千元设计费</p>
              </a>
            </div>
          </div>
          <div class="col-xs-6 pad0 boxsize pl12">
            <div class="col-xs-12 pad0 fun_nav_item pri">
              <a href="price.html" class="boxsize">
                <h5>
                  智能报价<span class="nav_hint" />
                </h5>
                <p>控制预算更省钱</p>
              </a>
            </div>
            <div class="col-xs-12 pad0 fun_nav_item boxsize ins mt9" styleName="mt9">
              <a href="yanfang.html" class="boxsize">
                <h5>
                  我要验房
                </h5>
                <p>更专业更权威</p>
              </a>
            </div>
          </div>
        </div>
        <!--三个功能nav end-->
      </div>

      <div class="main col-xs-12 pad0">
        <!--������ start-->
        <div class="col-xs-12 pad0 chat_part mod pt7">
          <div class="col-xs-12 big_tit chat_tit">
            <h5 class="pull-left">大家都在讨论</h5>
            <router-link :to="{name:'chatlist'}" class="more pull-right">更多 ></router-link>
          </div>
          <swiper id="swiper3" class="col-xs-12 pad0 swiper-container chat_con mod_con swiper3 mt33"
            :options="chatOption">
            <swiper-slide v-for="(chatarr,index) in chatarrs" v-if="index<3" class="swiper-slide boxsize">
              <div class="boxsize chat_item mod_item ft26">
                <router-link :to="{name:'chat',params:{id:chatarr.id}}">
                  <img :src="chatarr.pic" alt="">
                  <div class="chat_inf mod_inf boxsize">
                    <h5 class="pl33 ell">{{ chatarr.tit }}</h5>
                    <p class="pl33">{{ chatarr.num }}人参与讨论</p>
                  </div>
                </router-link>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <!--������ end-->
        <!--���λ start-->
        <!-- <img src="./asset/adv.jpg" class="adv col-xs-12 pad0 mt45"> -->
        <!--���λ end-->
        <!--װ����ͼ start-->
        <div class="col-xs-12 pad0 mod pt7 meitu_part mt44">
          <div class="col-xs-12 big_tit">
            <h5 class="pull-left">装修美图</h5>
            <router-link :to="{name:'meitu'}" class="more pull-right">更多 ></router-link>
          </div>
          <div id="swiper4" class="col-xs-12 swiper-container mod_con meitu_con swiper4">
            <div v-for="(picarr,index) in picarrs" v-if="index<4" class="boxsize mod_item meitu_item ft26 fl">
              <a :href="picarr.href">
                <img :src="picarr.pic" alt="">
                <div class="mod_inf meitu_inf boxsize">
                  <h5 class="ell">{{ picarr.tit }}</h5>
                </div>
              </a>
            </div>

          </div>

        </div>

        <div class="col-xs-12 pad0 mod pt7 case_part mt44">
          <div class="col-xs-12 big_tit">
            <h5 class="pull-left">装修案例</h5>
            <a href="case_list.html" class="more pull-right">更多 ></a>
          </div>

          <swiper id="swiper5" class="col-xs-12 pad0 swiper-container mod_con case_con swiper5 mt33"
            :options="caseOption">
            <swiper-slide v-for="casearr in casearrs" class="swiper-slide boxsize">
              <div class="mod_item case_item ft26">
                <a href="case_det.html">
                  <div class="case_pic">
                    <img :src="casearr.pic" alt="">
                    <span class="num_hint ft20">{{ casearr.num }}张</span>
                  </div>
                  <div class="mod_inf case_inf boxsize">
                    <h5 class="clearfix">
                      <span class="pull-left ell">{{ casearr.type1 }}·{{ casearr.type2 }}</span>
                      <em class="pull-right">{{ casearr.area }}m<sup>2</sup></em>
                    </h5>
                    <p class="w100 ell">设计公司：{{ casearr.com }}</p>
                  </div>
                </a>

              </div>
            </swiper-slide>
          </swiper>

        </div>

        <div class="col-xs-12 pad0 mod pt7 hot_part mt44">
          <div class="col-xs-12 big_tit">
            <h5 class="pull-left">热门活动</h5>
            <a href="hot_act.html" class="more pull-right">更多 ></a>
          </div>
          <div v-for="hotarr in hotarrs" class="col-xs-12 hot_con">
            <!-- 路由传参的方式 -->
            <router-link :to="{name:'hotact',params:{id:hotarr.id}}">
              <img :src="hotarr.pic" alt="" class="fl">
              <div class="hot_int fr">
                <h5 class="hot_tit">{{ hotarr.tit }}</h5>
                <p class="hot_tim">{{ dateform(hotarr.starttime/1000) }} 至 {{ dateform(hotarr.endtime/1000) }} </p>
                <span v-if="hotarr.starttime>gettime" class="hot_sta pre_state">即将开始</span>
                <span v-else-if="hotarr.starttime<=gettime && hotarr.endtime>gettime"
                  class="hot_sta doing_state">进行中</span>
                <span v-else="hotarr.endtime<=gettime" class="hot_sta done_state">已结束</span>
              </div>
            </router-link>
          </div>
          <!-- <div class="col-xs-12 hot_con">
                  <a href="">
                       <img src="./asset/images/hot_act.png" alt="" class="fl">
                      <div class="hot_int fr">
                          <h5 class="hot_tit">6月9日365看房团城南品质线火热报名中</h5>
                          <p class="hot_tim">2019-05-08 至 2019-06-08</p>
                          <span class="hot_sta doing_state">进行中</span>
                      </div>
                  </a>
              </div> -->
        </div>
        <!--���Ż end-->
        <!--����ʵ̽ start-->
        <div class="col-xs-12 pad0 mod pt7 site_part mt44">
          <div class="col-xs-12 big_tit">
            <h5 class="pull-left">工地实探</h5>
          </div>
          <div class="col-xs-12 site_con mt33">
            <div class="site_item col-xs-12 pad0">
              <div id="swiper6" class="col-xs-12 pad0 swiper-container swiper6 site_ban">
                <swiper class="swiper-wrapper" style="height:auto">
                  <swiper-slide v-for="(sitearr,index) in sitearrs" v-if="index<3" class="swiper-slide">
                    <a href="site_det.html">
                      <img :src="sitearr.pic" alt="">
                      <div class="boxsize site_det clearfix">
                        <div class="site_inf ft24 pull-left">

                          <h5 class="site_tit clearfix">
                            <em class="pull-left ell">{{ sitearr.sitename }}</em>
                            <p class="pull-left"><span class="pull-left">装修预算：</span><em
                                class="pull-left ">{{ sitearr.price }}万</em></p>
                          </h5>
                          <p class="clearfix mt20 site_con2">
                            <span class="pull-left ft20 site_hint">{{ sitearr.stage }}</span>
                            <span class="pull-left ml12">面积：</span><em
                              class="pull-left pr12 bor">{{ sitearr.area }}m<sup>2</sup></em>
                            <span class="ml12 pull-left">风格：</span><em class="pull-left">{{ sitearr.type }}</em>
                          </p>

                        </div>
                        <div href="site_det.html" class="site_order pull-right">
                          参观预约
                        </div>
                      </div>
                    </a>
                  </swiper-slide>

                </swiper>
                <!--<div class="pagination swp6_pag" id="swp6_pag"></div>-->
              </div>
              <!--<div class="col-xs-12 pad0 site_bot">

                          <div class="boxsize site_det clearfix">
                              <div class="site_inf ft24 pull-left">
                                  <a href="site_det.html">
                                      <h5 class="site_tit clearfix"><em class="pull-left ell">�����佭��12</em><span class="pull-left ft20 site_hint">��������</span></h5>
                                      <p class="clearfix mt20"><span class="pull-left">�����</span><em class="pull-left">120m<sup>2</sup></em><span class="ml36 pull-left">���</span><em class="pull-left">��ʽ</em></p>
                                      <p class="clearfix mt20"><span class="pull-left">װ��Ԥ�㣺</span><em class="pull-left">4��</em></p>
                                  </a>

                              </div>
                              <a href="site_det.html" class="site_order pull-right">
                                  �ι�ԤԼ
                              </a>
                          </div>
                      </div>-->

            </div>

          </div>
        </div>
        <!--���Ҽ�С�� start-->
        <div class="col-xs-12 pad0 find_area mt44">
          <div class="find_con clearfix">
            <div class="col-xs-12 pad0 find_tit clearfix">
              <h5 class="pull-left">找我家小区</h5>
              <p class="pull-right">已有<span>77</span>人预约</p>
            </div>
            <div class="col-xs-12 pad0 mt25 find_inf clearfix">
              <div class="pull-left area_inpt ft24">
                <input type="text" placeholder="请输入小区名称" class="boxsize">
                <ul class="area_box abs">
                  <li />
                </ul>
              </div>
              <div class="pull-right reorder ft24">
                <img :src="arrow" alt="">
                预约参观工地</div>
            </div>
          </div>
        </div>

        <!-- 装修公司列表 start-->
        <!-- <comList :tabs="tabs" :comlists="comlists"></comList> -->
        <div class="col-xs-12 pad0 com mt44">
          <div ref="mod_nav" class="com_nav mod_nav">
            <ul class="com_nav2 mod_nav2 clearfix">
              <li v-for="(tab,index) in tabs" ref="tabli" :class="['com_cho',clicknum==index?'mod_cho':'']"
                :data-id="index" :key="tab.tabname" @click="move(index,tab.clicktime)">
                <span>{{ tab.tabname }}</span>
              </li>
            </ul>

          </div>
          <div class="com_con w100">
            <ul class="com_con2 clearfix">
              <!-- @scroll="toend(index,comlist.times)" -->
              <li v-for="(comlist,index) in comlists" v-show="clicknum==index" ref="com" class="com_list" data-type="0">
                <div class="com_main">
                  <div class="com_main2">
                    <div v-for="comarr in comlist.comarrs" class="com_item clearfix w100">
                      <img :src="comarr.arrs.pic" alt="" class="fl">
                      <div class="com_inf fr">
                        <h5 class="com_name ell">{{ comarr.arrs.com_name }}</h5>
                        <div class="mt21 clearfix">
                          <div class="fl com_inf2 ">
                            <p class="loc">{{ comarr.arrs.loc }}</p>
                            <p class="gift">{{ comarr.arrs.gift }}</p>
                            <p class="ding">{{ comarr.arrs.ding }}</p>
                          </div>
                          <span class="fr jl">6.5km</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- v-show="comlist.isend" -->
                <a class="toend">查看更多</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 装修公司列表 end-->
      </div>

    </div>
    <pop></pop>
  </div>

</template>
<style lang="stylus">
  /* #app
        font-family 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        text-align center
        color #2c3e50

      #nav
        padding 30px
        a
          font-weight bold
          color #2c3e50
          &.router-link-exact-active
            color #42b983 */
</style>

<style rel="stylesheet">
  /* webpack里别名@（/src）*/
  @import '~@/assets/css/bootstrap.min.css';
  @import '~@/assets/css/all.css';
  @import '~@/assets/css/index.css';
  @import '~@/assets/css/hot_act.css';

  .container-fluid {
    position: relative;
  }
</style>
<style scoped>
  .mod_nav .mod_nav2 {
    width: 140%;
    padding: 0;
  }

  .linkcol {
    color: blue;
  }
</style>
<script>
  /* 测试成功引入jquery */
  /* $(function(){
      alert("123");
  }) */
  /* 图片作为模板导入最终生成的文件名包含内容hash值*/
  // 如果是直接export的对象就用import {} from ...导入，如果是export default 的对象就直接import ... from ...

  //mapState 将store 里的state 映射到局部计算属性
  //mapGetters 将store 里的 getter 映射到局部计算属性

  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import '~@/assets/js/bootstrap.min.js'
  // 导入接口调用
  import { users } from '~@/apis/express'
  import logo from '~@/assets/meitu.png'
  import chatlogo from '~@/assets/chat.png'
  import sell from '~@/assets/sell.png'
  // 加载组件
  import pop from '~@/components/pop.vue'
  import comList from '~@/components/comList.vue'
  import { eventBus } from '~@/utils/event-bus.js'
  // let api=require('../.././api');
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'Tem',
    props: {
      hotacts: {
        type: Array,
        default() {
          // 默认值
          return []
        }
      },
      chatdata: {
        type: Array,
        default() {
          return []
        }
      },
      meitudata: {
        type: Array,
        default() {
          return []
        }
      },
      casedata: {
        type: Array,
        default() {
          return []
        }
      },
      sitedata: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data: function () {
      return {
        arrow: require('../../assets/findarr.png'),
        navs: [
          {
            href: { name: 'meitu' },
            icon: logo,
            title: '看美图'
          },
          {
            href: { name: 'chatlist' },
            icon: chatlogo,
            title: '话题讨论'
          },
          {
            href: 'com_list.html',
            icon: sell,
            title: '家装卖场'
          },
          {
            href: 'com_list.html',
            icon: require('~@/assets/dz.png'),
            title: '全屋定制'
          },
          {
            href: 'case_list.html',
            icon: require('../../assets/case.png'),
            title: '装修案例'
          },
          {
            href: 'com_list.html',
            icon: require('../../assets/com.png'),
            title: '装修公司'
          },
          {
            href: 'com_list.html',
            icon: require('../../assets/jiancai.png'),
            title: '建材'
          },
          {
            href: 'com_list.html',
            icon: require('../../assets/jiaju.png'),
            title: '家具'
          },
          {
            href: 'les_list.html',
            icon: require('../../assets/lesson.png'),
            title: '装修课堂'
          },
          {
            href: 'inf_list.html',
            icon: require('../../assets/zixun.png'),
            title: '家居资讯'
          },
          {
            href: 'inf_list.html',
            icon: require('../../assets/dairy.png'),
            title: '装修日记'
          },
          {
            href: 'com_list.html',
            icon: require('../../assets/rz.png'),
            title: '软装'
          },
          {
            href: 'merchant.html',
            icon: require('../../assets/shop.png'),
            title: '商户入驻'
          },
          {
            href: '',
            icon: require('../../assets/cop.png'),
            title: '商家合作'
          },
          {
            href: '',
            icon: require('../../assets/weiquan.png'),
            title: '投诉维权'
          }
        ],
        //  设置swiper属性
        swiperOption: {
          pagination: {
            el: '.pagination'
          },
          autoplay: true,
          loop: true
        },
        chatOption: {
          slidesPerView: 1.3
        },
        caseOption: {
          slidesPerView: 2.3
        },
        banarrs: [
          {
            href: 'http://weixin.365url.cc/jiaju/home/lfsjpc/index.php',
            img: require('~@/assets/ban.jpg')
          },
          {
            href: 'http://weixin.365url.cc/jiaju/home/lfsjpc/index.php',
            img: require('../../assets/ban.jpg')
          },
          {
            href: 'http://weixin.365url.cc/jiaju/home/lfsjpc/index.php',
            img: require('../../assets/ban.jpg')
          },
          {
            href: 'http://weixin.365url.cc/jiaju/home/lfsjpc/index.php',
            img: require('../../assets/ban.jpg')
          }
        ],
        chat: '你假装新风系统吗',
        clicknum: 1,
        tabs: [
          {
            'tabname': '全部',
            'clicktime': 0
          },
          {
            'tabname': '装饰公司',
            'clicktime': 0
          },
          {
            'tabname': '建材',
            'clicktime': 0
          },
          {
            'tabname': '设计知识',
            'clicktime': 0
          },
          {
            'tabname': '家居风水',
            'clicktime': 0
          },
          {
            'tabname': '家装卖场',
            'clicktime': 0
          }
        ],
        comlists: [],
        sitearrs: [],
        isend: true,
        isload: true,
        linkchose: -1
      }
    },
    components: {
      pop,
      comList
    },
    computed: {
      hotarrs: function () {
        var hotacts = this._props.hotacts
        //  对于本地调的数据中图片路径加载不出来，可以将图片放入assets文件夹里面，然后访问本地assets中的图片
        /*  hotacts.forEach(function(item){
            item.pic=require("../../assets/hot_act.png")
        }) */
        return hotacts
      },
      gettime: function () {
        console.log('now' + new Date().getTime() / 1000)
        return new Date().getTime() / 1000
      },
      chatarrs: function () {
        return this._props.chatdata
      },
      picarrs: function () {
        return this._props.meitudata
      },
      casearrs: function () {
        return this._props.casedata
      },
      ...mapState({
        stateA: rootState => rootState.a,
        count: rootState => rootState.count,
        modAdata: state => state.moduleA.modA
      }),
      ...mapGetters([
        'beArray',
        'removeLast'
      ])
      /* ...mapState({
        stateA: state => state.a,
        count: state => state.a.count,
        msg: state => state.a.msg,
        stateB: state => state.b,
        singer: state => state.b.singer,
        samemusic: rootState => rootState.samemusic
      }),
      ...mapGetters({
        getarrsBynumA: 'a/getarrsBynum',
        reverseArrA: 'a/reverseArr',
        reverseMsgA: 'a/reverseMsg',
        callmusicA: 'a/callmusic',
        callArrlengthA: 'a/callArrLength'
      }) */
      /* sitearrs:function(){
        return this._props.sitedata
      } */

    },
    created() {
      console.log("实例已经创建")
    },
    mounted: function () {
      //  在组件挂载之前执行
      //  渲染跨域图片怎么渲染
      /* this.increment({num:10});
      console.log("count2",this.count); */
      this.initTab();
      console.log("当前路由元信息为", this.$route.meta.keepAlive)
      console.log("vuex-a", this.stateA);
      console.log("beArray", this.beArray);
      console.log("removeLast", this.removeLast);
      console.log("count0-", this.count);
      this.increment({ addnum: 3 });
      console.log("count1-", this.count);

      this.incrementAsync({ addnum: 9 }).then(() => {
        console.log("异步vuex");
        console.log("count2-", this.count);
      })
      this.incrementAsyncB({ addnum: 12 }).then(() => {
        console.log("异步vuex-B");
        console.log("count3-", this.count);
      })
      console.log("moduleA数据", this.modAdata)

      console.log("hello world");
      const obj1 = { a: { b: 1 } }
      const obj2 = Object.assign({}, obj1)
      console.log(obj2)//  {a:{b:1}}
      console.log(this.reverseMsgA)
      console.log('state msg为:', this.msg)
      console.log('count为：', this.count)

      const timer = setInterval(function () {
        console.log("1s");
      }, 1000)
      //监听当前组件销毁的时候
      this.$once('hook:beforeDestroy', function () {
        console.log("this is destroy 清空定时器");
        clearInterval(timer);
      })

      function getStockSymbol(name) {
        return 3
      }
      function getStockPrice(symbol) {
        return symbol * 3
      }
      //  async函数完全可以看作多个异步操作，
      //  包装成的一个 Promise 对象，
      //  而await命令就是内部then命令的语法糖。
      async function getStockPriceByName(name) {
        const symbol = await getStockSymbol(name)
        const stockPrice = await getStockPrice(symbol)
        //  下面代码等await异步操作完成才会执行
        return stockPrice
      }

      getStockPriceByName('goog').then(function (result) {
        console.log('股价为：' + result)
      })

      const asynccall = new Promise(function (resolve, reject) {
        var x = 1

        resolve(x + 2)
      })
      asynccall.then((res) => {
        console.log('ok')
        console.log('asynccall执行结果为：', res)
      }).catch((error) => {
        console.log(error)
      })

      // 休眠语法，让程序停顿指定时间
      class Sleep {
        constructor(timeout) {
          this.timeout = timeout
        }
        then(resolve, reject) {
          const starttime = Date.now()
          console.log(starttime)
          setTimeout(() => {
            resolve(Date.now() - starttime)
          }, this.timeout)
        }
      }
      (async () => {
        const sleeptime = await new Sleep(1000)
        console.log('休眠时间：', sleeptime)
      })()

      function* hello() {
        yield 'hello'
        yield 'world'
        return 'ending'
      }
      var hw = hello()
      console.log('hw执行结果为:', hw.next())
      hw.next()
      console.log('hw执行结果为:', hw.next())
      var _this = this
      this.lazyload(0, false, 0)
      this.sitearrs = this._props.sitedata
    },
    activated() {
      console.log("当前组件被缓存")
    },
    methods: {
      ...mapMutations([
        'increment'
      ]),
      ...mapActions([
        'incrementAsync',
        'incrementAsyncB'
      ]),
      closepop() {
        console.log("click");
        //发布
        eventBus.$emit('closepop');
      },
      initTab() {
        // tab 滑动属性初始化
        console.log("获取父级元素==》", this.$refs.mod_nav.offsetWidth);
        let outW = this.$refs.mod_nav.offsetWidth;
        let calW = 0;
        let endInd = 0;
        try {
          this.$refs.tabli.forEach((item, index) => {
            calW = item.offsetWidth + item.offsetLeft;
            if (calW >= outW) {
              endInd = index;
              // 跳出循环体
              throw Error
            }

          })
        } catch (error) {
          console.log(error)
        }
        $('.mod_nav li').eq(0).attr("data-start", true);
        $('.mod_nav li').eq(endInd - 1).attr("data-end", true);
      },
      lazyload: function (clicktime, iscroll, loadtimes) {
        //alert("clicktime" + clicktime + "iscroll" + iscroll, +"loadtimes" + loadtimes);
        console.log("请求users");
        //  clicktime是点击标签的次数,iscroll判断是否处于滚动加载状态，true为滚动加载，
        //  loadtimes为加载次数
        //
        var _this = this
        var clicknum = this.clicknum
        var tabs = this.tabs
        var loadtimes = loadtimes
        /* express跨域请求数据post方法 */

        if (clicktime == 0) {
          users(
            {
              id: clicknum + 1,
              page: loadtimes + 1
            }
          ).then(function (res) {
            //alert("2222");
            console.log('data', res.data)
            var arr = _this.comlists
            if (res.data.length != 0) {
              console.log('express', res.data)

              const lazydata = res.data

              if (_this.isload) {
                // 第一次进页面初始化
                for (let i = 0; i < 6; i++) {
                  if (clicknum == i) {
                    //  tab对应的是选择的tab,comarrs对应的是渲染的数组,times对应的加载的次数
                    arr.push({ 'tab': clicknum + 1, comarrs: lazydata, times: 1, isend: false })
                  } else {
                    arr.push({ 'tab': i + 1, comarrs: [], times: 0, isend: false })
                  }
                }

                _this.isload = false
              } else {
                //  第一次点击加载数据,第二次点击只是显示隐藏
                arr[clicknum].comarrs = lazydata
                //  加载次数
                arr[clicknum].times = 1
                /* console.log("block"); */
              }
              tabs[clicknum].clicktime = 1

              console.log(arr)

              if (lazydata.length < 3) {
                console.log('无相关数据')
                arr[clicknum].isend = true
              }
              _this.comlists = arr
              _this.tabs = tabs
            } else {
              arr[clicknum].isend = true
              console.log('无相关数据')
            }
          }).catch(function (error) {
            alert("1111");
            console.log(error)
          })
        }
        if (iscroll) {
          //  滚动加载状态
          console.log('23333')
          //alert("333");
          loadtimes++
          users(
            {
              id: clicknum + 1,
              page: loadtimes
            }
          ).then(function (res) {
            console.log(res.data)
            var arr = _this.comlists
            if (res.data.length != 0) {
              const lazydata = res.data

              arr[clicknum].comarrs.push(...lazydata)
              loadtimes++
              arr[clicknum].times = loadtimes
              console.log(arr)
              _this.comlists = arr
            } else {
              arr[clicknum].isend = true
              console.log('无相关数据')
            }
          }).catch(function () {

          })
        }
      },
      dateform: function (date) {
        return this.formdate('Y-m-d', date)
      },
      toend: function (ind, times) {
        // this是指的当前组件,$ref获取的元素只能调用原生js的方法
        /* if(this.$refs.com[ind].scrollTop>this.$refs.com[ind].) */
        const _this = this
        var innH = this.$refs.com[ind].firstChild.offsetHeight
        var outH = this.$refs.com[ind].offsetHeight
        const iscroll = true
        if (this.$refs.com[ind].scrollTop >= innH - outH) {
          this.lazyload(1, iscroll, times)
          //  触发触底事件
          //     _this.$http1.post("../../api/com.json",{
          //         params:{

          //         }
          //     }).then(function(res){

          //         if(res.data.data.result[ind]["arrs"].length>0&&_this.isend){
          //             _this.isend=false;
          //             var temdata=_this.comlists;
          //             _this.comlists[ind]["arrs"]=_this.comlists[ind]["arrs"].concat(res.data.data.result[ind].arrs);

          //         }else{
          //             console.log("到底了");
          //             _this.comlists[ind]["isend"]=true;
          //         }

          //     }).catch(function(error){

          //     })
        } else {
          _this.isend = true
        }
      },
      move: function (ele, clicktime) {
        //  ele为点击tab对应的下标，clicktime为点击tab次数
        this.clicknum = ele
        const iscroll = false
        const loadtimes = this.comlists[ele].times// 加载次数
        this.lazyload(clicktime, iscroll, loadtimes)
        var _this = $('.com_nav .com_cho').eq(ele)
        // 菜单切换左移效果
        if (_this.attr('data-end') == 'true' && _this.index() != ($('.com_con2 li').length - 1)) {
          $('.mod_nav li').each(function () {
            if ($(this).attr('data-start') == 'true') {
              $('.mod_nav li').attr({ 'data-start': 'false', 'data-end': 'false' })
              $(this).next().attr('data-start', 'true')
              return false
            }
          })
          $('.mod_nav2').animate({ 'margin-left': parseFloat($('.mod_nav2').css('margin-left')) - _this.next().outerWidth() + 'px' })
          _this.next().attr('data-end', 'true')
        }
        //  菜单切换右移效果
        if (_this.attr('data-start') == 'true' && _this.index() != 0) {
          $('.mod_nav li').each(function () {
            if ($(this).attr('data-end') == 'true') {
              $('.mod_nav li').attr({ 'data-start': 'false', 'data-end': 'false' })
              $(this).prev().attr('data-end', 'true')
              return false
            }
          })
          $('.mod_nav2').animate({ 'margin-left': parseFloat($('.mod_nav2').css('margin-left')) + _this.prev().outerWidth() + 'px' })
          _this.prev().attr('data-start', 'true')
        }
      },
      tolink(ind) {
        this.linkchose = ind;
        console.log("333");
      }
    }
  }

</script>