
<template>
    <div class="col-xs-12 pad0 com mt44">
        <div ref="mod_nav" class="com_nav mod_nav">
          <ul class="com_nav2 mod_nav2 clearfix">
            <li v-for="(tab,index) in tabs" ref="tabli" :class="['com_cho',clicknum==index?'mod_cho':'']" :data-id="index" @click="move(index,tab.clicktime)">
              <a>{{ tab.tabname }}</a>
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

</template>
<style>

    @import '~@/assets/css/all.css';
    @import '~@/assets/css/index.css';
</style>
<style scoped>
    .mod_nav .mod_nav2{
        width:140%;
        padding:0;
    }
</style>
<script>
    // 导入接口调用
    import { users } from '~@/apis/express'
    export default{
        name:"comList",
        props:['tabs','comlists'],
        data:function(){
            return {
                clicknum:1
                
            }
        },
        mounted(){
            // 公司tab初始化
            var navwid = 0
            var isstop = true
            console.log(this.$refs.tabli)
            console.log(this.$refs.mod_nav);
            var _this=this;
            _this.$refs.tabli[0].setAttribute('data-start', true)
            _this.$refs.tabli.forEach(function(item, index) {
            if (isstop) {
                navwid += (item.offsetWidth + 40)

                if (navwid >= _this.$refs.mod_nav.offsetWidth) {
                    var ind = index - 1
                    console.log(ind)
                    if (ind > 0) {
                        _this.$refs.tabli[ind].setAttribute('data-end', true)
                    }
                    isstop = false
                }
            }
            })
        },
        methods:{
            lazyload: function(clicktime, iscroll, loadtimes) {
                alert("clicktime"+clicktime+"iscroll"+iscroll,+"loadtimes"+loadtimes);
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
                    ).then(function(res) {
                    alert("2222");
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
                    }).catch(function(error) {
                    alert("1111");
                    console.log(error)
                    })
                }
                if (iscroll) {
                    //  滚动加载状态
                    console.log('23333')
                    alert("333");
                    loadtimes++
                    users(
                    {
                        id: clicknum + 1,
                        page: loadtimes
                    }
                    ).then(function(res) {
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
                    }).catch(function() {

                    })
                }
            },
            move: function(ele, clicktime) {
                //  ele为点击tab对应的下标，clicktime为点击tab次数
                this.clicknum = ele
                const iscroll = false
                const loadtimes = this.comlists[ele].times// 加载次数
                this.lazyload(clicktime, iscroll, loadtimes)
                var _this = $('.com_nav .com_cho').eq(ele)
                // 菜单切换左移效果
                if (_this.attr('data-end') == 'true' && _this.index() != ($('.com_con2 li').length - 1)) {
                    $('.mod_nav li').each(function() {
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
                    $('.mod_nav li').each(function() {
                    if ($(this).attr('data-end') == 'true') {
                        $('.mod_nav li').attr({ 'data-start': 'false', 'data-end': 'false' })
                        $(this).prev().attr('data-end', 'true')
                        return false
                    }
                    })
                    $('.mod_nav2').animate({ 'margin-left': parseFloat($('.mod_nav2').css('margin-left')) + _this.prev().outerWidth() + 'px' })
                    _this.prev().attr('data-start', 'true')
                }
                }
            }
    }

</script>