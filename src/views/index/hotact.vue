<template>
  <div class="container-fluid main">
    <div class="row">
      <div class="top top1 rela">
        <a href="javascript:history.back(-1)" class="iconfont icon-jiantou abs backarr" />
        <h5>热门活动</h5>
      </div>
      <div class="hot_det w100">
        <img :src="actdata.bigpower" alt="" class="act_pho">
        <div class="hot_det2">
          <div class="hot_top">
            <h5 class="hot_tit">{{ actdata.tit }}</h5>
            <div class="hot_inf clearfix mt22">
              <p class="pull-left ft22">{{ dateform(actdata.starttime) }} 至 {{ dateform(actdata.endtime) }}</p>
              <span v-if="actdata.starttime>gettime" class="pull-right ft26 pre_state">即将开始</span>
              <span
                v-else-if="actdata.starttime<=gettime&&actdata.endtime>gettime"
                class="pull-right ft26 doing_state"
              >进行中</span>
              <span v-else="actdata.endtime<=gettime" class="pull-right ft26 done_state">已结束</span>
            </div>
          </div>
          <div class="bm_hint">
            便宜买家居、建材，不是事！
            <br>
            免费得家居礼品，不是事
            <br>
            免费拿装修基金，更加不是事！
            <br>
            据说，这次“放血”支持本次活动的甲方爸爸（弘阳家居江宁商场） 拿出了极大的诚意哦。
            <br>
            诚意清单双手奉上！
            <br>
            点击网址报名<a href="">http://kanfang.nj.house365.com/</a>
          </div>
        </div>
        <div class="bm_fm">
          <form action="">
            <h5>活动报名</h5>
            <div class="mt35 clearfix">
              <div class="label_group pull-left">
                <label for="">姓名</label>
                <label for="">手机号</label>
                <label for="">人数</label>
                <label for="">年龄</label>
                <label for="">身份证</label>
                <label for="">房屋面积</label>
                <label for="">装修预算</label>
                <label for="">软装预算</label>
                <label for="">半包预算</label>
                <label for="">全包预算</label>
                <label for="">楼栋号</label>
                <label for="">交付日期</label>
                <label for="">儿童年龄</label>
                <label for="">儿童身高</label>
                <label for="">儿童姓名</label>
                <label for="">儿童房面积</label>
                <label for="">性别</label>
                <label for="">是否交付</label>
                <label for="">开工时间</label>
                <label for="">是否拿房</label>
                <label for="">装修类型</label>
                <label for="">儿童性别</label>
                <label for="">是否同意</label>
                <label for="">是否参与</label>
                <label for="">是否加入</label>
              </div>
              <div class="inp_group pull-right">
                <input type="text" name="username">
                <input type="text" name="phone" class="mt35">
                <input type="text" name="num" class="mt35">
                <input type="text" name="age" class="mt35">
                <input type="text" name="idcard" class="mt35">
                <input type="text" name="area" class="mt35">
                <input type="text" name="zxys" class="mt35">
                <input type="text" name="rzys" class="mt35">
                <input type="text" name="bbys" class="mt35">
                <input type="text" name="qbys" class="mt35">
                <input type="text" name="ldh" class="mt35">
                <input type="text" name="jfrq" class="mt35">
                <input type="text" name="etnl" class="mt35">
                <input type="text" name="etsg" class="mt35">
                <input type="text" name="etxm" class="mt35">
                <input type="text" name="etf_area" class="mt35">
                <div class="mt35">
                  <input type="radio" name="sex">男
                  <input type="radio" name="sex">女
                </div>
                <div class="mt35">
                  <input type="radio" name="jf">是
                  <input type="radio" name="jf">否
                </div>
                <div class="mt35">
                  <input type="radio" name="kg">近期
                  <input type="radio" name="kg">三个月以后
                  <input type="radio" name="kg">一年以后
                </div>
                <div class="mt35">
                  <input type="radio" name="nf">拿了
                  <input type="radio" name="nf">未拿房
                </div>
                <div class="mt35">
                  <input type="radio" name="type">半包
                  <input type="radio" name="type">全包
                </div>
                <div class="mt35">
                  <input type="radio" name="childsex">男
                  <input type="radio" name="childsex">女
                </div>
                <div class="mt35">
                  <input type="radio" name="agree">是
                  <input type="radio" name="agree">否
                </div>
                <div class="mt35">
                  <input type="radio" name="canyu">是
                  <input type="radio" name="canyu">否
                </div>
                <div class="mt35">
                  <input type="radio" name="join">是
                  <input type="radio" name="join">否
                </div>
              </div>
            </div>
            <input type="button" value="提  交">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  @import '~@/assets/css/bootstrap.min.css';
  @import '~@/assets/iconfont/iconfont.css';
  @import '~@/assets/css/all.css';
  @import '~@/assets/css/hot_det.css';
</style>
<script>

</script>
<script>

  require('../../mock/mock.js');
  export default {
    name: "hotact",
    props:['id'],
    created: function () {
      var _this = this;
      var id = this.id;   
      var predata = null;
      this.$http1.post('/test', {
        //这里传递参数
        params: {

        }
      }).then(function (res) {
        console.log(res);
        var newarrs = res.data.result;
        newarrs.forEach(function (item) {
          if (item.id == id) {
            predata = item
          }
        })
        console.log(predata);
        _this.actdata = predata;
        /* if(res.status==200){
           var detail_data=res.data.data.array;
           var newarrs=_this.tojson(detail_data);
           console.log(newarrs);
           newarrs.forEach(function(item){
               if(item.id==id){
                   predata=item
               }
           })
           console.log(predata);
           _this.actdata=predata;
       }  */

      }).catch(function (error) {
        console.log(error);
      })
    },
    data: function () {
      return {
        actdata: {}
      }
    },
    computed: {
      gettime: function () {
        console.log("now" + new Date().getTime() / 1000);
        return new Date().getTime() / 1000
      }
    },
    methods: {
      dateform: function (date) {
        console.log(date);
        return this.formdate("Y-m-d", date);
      }
    }
  }
</script>
