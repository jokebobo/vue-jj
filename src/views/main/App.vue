<template>

  <div style="height:100%">
    <!-- include 优先匹配组件注册的name -->
    <keep-alive :include="['Tem']">
      <!-- 在router-view里面绑定key 使每次路由切换的时候会被识别为一个新的组件 不能做路由缓存 -->
      <transition :name="aniName">
        <router-view :hotacts="hotacts" :chatdata="chatdata" :meitudata="meitudata" :casedata="casedata"
          :sitedata="sitedata" />
      </transition>
    </keep-alive>
  </div>
</template>
<style scoped>
  .slide-enter {
    left: 100%;
  }

  .slide-enter-active {
    animation: moveIn 1s;
  }

  @keyframes moveIn {
    0% {
      left: 100%;
    }

    100% {
      left: 0%;
    }
  }

  .slide-leave {
    left: 0%;
  }

  .slide-leave-active {
    animation: moveleave 1s;
  }

  @keyframes moveleave {
    0% {
      left: 0%;
    }

    100% {
      left: 100%;
    }
  }
</style>
<style lang="stylus">

</style>

<script>

  /* const Mock=require('mockjs'); */
  /* 简单方式使用mock数据 */
  require('../../mock/mock.js')
  // 导入接口调用
  import { test, chat } from '~@/apis/api2'
  import { removeToken } from '~@/utils/auth'
  export default {
    name: 'Index',
    data: function () {
      return {
        'msg': 'hello world',
        'hotacts': [],
        'chatdata': [],
        'meitudata': [],
        'casedata': [],
        'sitedata': [],
        'aniName': 'slide-enter'
      }
    },
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    },
    watch: {
      $route(to, from) {
        let todep = to.path.split("/").length;
        let fromdep = from.path.split("/").length;
        this.aniName = todep >= fromdep ? 'slide-enter' : 'slide-leave'
        console.log("监听路由变化", this.aniName)
      }
    },
    beforeCreate: function () {
      // 组件加载时
      // 调用本地接口
      var _this = this
      /* this.$http1.post('../../api/test.json',{
         //这里传递参数
         params: {
  
       }
       }).then(function(res){
         if(res.data.data.code==1){
           console.log(res.data.data.data);
           var predata=res.data.data.data;
  
           /*  function createObjectURL(object) {
               return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
           }
           predata.forEach(function(item){
             item.pic=createObjectURL(item.pic);
           }) */

      /* _this._data.hotacts=predata;
     }
   }).catch(function(error){
     console.log(error)
   })*/

      // 跨域请求数据
      /* this.$http2.post('/express/test').then(function(res){
         console.log("express",res)
       }).catch(function(error){
         console.log(error)
       }) */

      /* express解决跨域请求数据 */
      /* get方法通过地址传递参数 */
      /* process.env在全局任意地方都可以获取 */
      console.log('当前环境变量为process.env:', process.env)

      /* this.$http1.post('/deve_api').then(function(res) {
        console.log('deve_api结果为', res)
      }).catch(function(error) {
        console.log(error)
      })
  
      this.$axios.get('/index/?id=3',
      ).then(function(res) {
        console.log('express22', res)
      }).catch(function(error) {
        console.log(error)
      }) */
      // 请求easy-mock生成的数据
      /* this.$http1.post('/aps/hot',
       ).then(function (res) {
         if (res.status == 200) {
           var hotarrs = res.data.data.array;
           var newarrs = [];
           hotarrs.forEach(element => {
             //将字符串转化为
             const ele = eval("(" + element + ")");
             newarrs.push(ele);
           })
           console.log(newarrs);
         }
  
       }).catch(function (error) {
         console.log(error);
       }) */

      /* this.$http1.post('/api/openid',
         //将对象 序列化成URL的形式，以&进行拼接。
         _this.qs.stringify({ code: '043038412Udp9W0Sho512tCY3120384I' })
  
       ).then(function (res) {
         console.log()
       }).catch(function (error) {
         console.log(error);
       }) */

      /* 调用随机mock数据*/

      this.$http1({
        method: 'post',
        url: '/comdata',
        data: {
          id: '456'
        },
        // 设置请求头
        // application/json  请求体中的数据会以json字符串的形式发送到后端
        // application/x-www-form-urlencoded 请求体中的数据会以普通表单形式（键值对）发送到后端
        // multipart/form-data： 它会将请求体的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        // 获取到返回的对应值
        console.log(res.data)
      }).catch(function (error) {
        console.log(error)
      })

      /* 热门活动数据 */
      test().then(function (res) {
        console.log('test', res)
        if (res.data.code == 1) {
          const predata = res.data.result

          _this._data.hotacts = predata
        }
      }).catch(function (error) {
        console.log(error)
      })
      /* 大家在讨论 */
      chat().then(function (res) {
        if (res.data.code == 1) {
          const predata = res.data.result

          _this._data.chatdata = predata
          console.log('chat', predata)
        }
      }).catch(function (error) {
        console.log(error)
      })
      /* 装修美图 */
      this.post('/meitu').then(function (res) {
        console.log("美图数据", res);
        if (res.data.code == 1) {
          const predata = res.data.result

          _this._data.meitudata = predata
        }
      }).catch(function (error) {
        console.log(error)
      })
      /* 工地实探 */
      this.post('/site').then(function (res) {
        if (res.data.code == 1) {
          const predata = res.data.result

          _this._data.sitedata = predata
        }
      }).catch(function (error) {
        console.log(error)
      })

      /* 装修案例 */
      this.post('/case').then(function (res) {
        if (res.data.code == 1) {
          const predata = res.data.result

          _this._data.casedata = predata
        }
      }).catch(function (error) {
        console.log(error)
      })

      /* this.$http1.post('/api/about').then(function (res) {
           console.log("about", res.data);
         }).catch(function (error) {
           console.log(error);
         })
         this.$http1.post('../../api/test2').then(function (res) {
           console.log("test2", res.data);
         }).catch(function (error) {
           console.log(error);
         })
         this.$http1.post('/api/product').then(function (res) {
           console.log("mongoDB", res);
         }).catch(function (error) {
           console.log(error);
         }) */
    },
    activated: function () {
      console.log("keep-alive被激活")
    },
    deactivated: function () {
      console.log("keep-alive 失效")
    },
    beforeDestroy: function () {
      removeToken('loginToken098');
    }
  }
</script>