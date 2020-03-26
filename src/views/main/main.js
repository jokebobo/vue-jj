import Vue from 'vue'
import App from './App.vue'
import router from '../../router'
import store from '../../store/index'
import '../../registerServiceWorker'
import '../../../node_modules/swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import qs from 'qs'
import axios from 'axios'
Vue.use(VueAwesomeSwiper)


Vue.config.productionTip = false
Vue.prototype.$http1=axios.create();//新建一个axios实例

Vue.prototype.$axios=axios.create();
Vue.prototype.$axios.defaults.baseURL="http://localhost:3000"
Vue.prototype.post = function(url, params) {
  return new Promise(function(resolve, reject) {
    axios.post(url, qs.stringify(params))
      .then(function(res) {
        resolve(res)
      })
      .catch(function(error) {
        reject(error)
      })
  })
}
Vue.prototype.get = function(url, params) {
  return new Promise(function(resolve, reject) {
    axios.get(url, { params })
      .then(function(res) {
        resolve(res)
      })
      .catch(function(error) {
        reject(error)
      })
  })
}
// 添加请求拦截器
Vue.prototype.$http1.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Vue.prototype.$http1.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response);
  return response;
}, function (err) {
  // 对响应错误做点什么
  console.log(err)
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误(400)'; break;
      case 401: return history.push('/login'); break;
      case 403: err.message = '拒绝访问(403)'; break;
      case 404: err.message = '请求出错(404)'; break;
      case 408: err.message = '请求超时(408)'; break;
      case 500: err.message = '服务器错误(500)'; break;
      case 501: err.message = '服务未实现(501)'; break;
      case 502: err.message = '网络错误(502)'; break;
      case 503: err.message = '服务不可用(503)'; break;
      case 504: err.message = '网络超时(504)'; break;
      case 505: err.message = 'HTTP版本不受支持(505)'; break;
      default: err.message = `连接出错(${err.response.status})!`;
    }
  } else {
    err.message = '连接服务器失败!'
  }
  message.error(err.message);
  return Promise.reject(err);

});

// 时间格式化
Vue.prototype.formdate = function(format, timestamp) {
  var jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date())

  var ret = ''
  var pad = function(n, c) {
    if ((n = n + '').length < c) {
      return new Array(++c - n.length).join('0') + n
    } else {
      return n
    }
  }
  var txt_weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var txt_ordin = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' }
  var txt_months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var f = {
    // Day
    d: function() { return pad(f.j(), 2) },
    D: function() { return f.l().substr(0, 3) },
    j: function() { return jsdate.getDate() },
    l: function() { return txt_weekdays[f.w()] },
    N: function() { return f.w() + 1 },
    S: function() { return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th' },
    w: function() { return jsdate.getDay() },
    z: function() { return (jsdate - new Date(jsdate.getFullYear() + '/1/1')) / 864e5 >> 0 },

    // Week
    W: function() {
      var a = f.z(); var b = 364 + f.L() - a
      var nd2; var nd = (new Date(jsdate.getFullYear() + '/1/1').getDay() || 7) - 1
      if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
        return 1
      } else {
        if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
          nd2 = new Date(jsdate.getFullYear() - 1 + '/12/31')
          return date('W', Math.round(nd2.getTime() / 1000))
        } else {
          return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0)
        }
      }
    },

    // Month
    F: function() { return txt_months[f.n()] },
    m: function() { return pad(f.n(), 2) },
    M: function() { return f.F().substr(0, 3) },
    n: function() { return jsdate.getMonth() + 1 },
    t: function() {
      var n
      if ((n = jsdate.getMonth() + 1) == 2) {
        return 28 + f.L()
      } else {
        if (n & 1 && n < 8 || !(n & 1) && n > 7) {
          return 31
        } else {
          return 30
        }
      }
    },

    // Year
    L: function() { var y = f.Y(); return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0 },
    // o not supported yet
    Y: function() { return jsdate.getFullYear() },
    y: function() { return (jsdate.getFullYear() + '').slice(2) },

    // Time
    a: function() { return jsdate.getHours() > 11 ? 'pm' : 'am' },
    A: function() { return f.a().toUpperCase() },
    B: function() {
      // peter paul koch:
      var off = (jsdate.getTimezoneOffset() + 60) * 60
      var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off
      var beat = Math.floor(theSeconds / 86.4)
      if (beat > 1000) beat -= 1000
      if (beat < 0) beat += 1000
      if ((String(beat)).length == 1) beat = '00' + beat
      if ((String(beat)).length == 2) beat = '0' + beat
      return beat
    },
    g: function() { return jsdate.getHours() % 12 || 12 },
    G: function() { return jsdate.getHours() },
    h: function() { return pad(f.g(), 2) },
    H: function() { return pad(jsdate.getHours(), 2) },
    i: function() { return pad(jsdate.getMinutes(), 2) },
    s: function() { return pad(jsdate.getSeconds(), 2) },
    // u not supported yet

    // Timezone
    // e not supported yet
    // I not supported yet
    O: function() {
      var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4)
      if (jsdate.getTimezoneOffset() > 0) t = '-' + t; else t = '+' + t
      return t
    },
    P: function() { var O = f.O(); return (O.substr(0, 3) + ':' + O.substr(3, 2)) },
    // T not supported yet
    // Z not supported yet

    // Full Date/Time
    c: function() { return f.Y() + '-' + f.m() + '-' + f.d() + 'T' + f.h() + ':' + f.i() + ':' + f.s() + f.P() },
    // r not supported yet
    U: function() { return Math.round(jsdate.getTime() / 1000) }
  }

  return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {
    if (t != s) {
      // escaped
      ret = s
    } else if (f[s]) {
      // a date function exists
      ret = f[s]()
    } else {
      // nothing special
      ret = s
    }
    return ret
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
  mounted:function(){
   //vue实例渲染
   var design_width = 750;
   if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
     var version = parseFloat(RegExp.$1);
     if (version > 2.3) {
       var phoneScale = parseInt(window.screen.width) / design_width;
       document.write('<meta name="viewport" content="width=' + design_width + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
     } else {
       document.write('<meta name="viewport" content="width=' + design_width + ', target-densitydpi=device-dpi">');
     }
   } else {
     document.write('<meta name="viewport" content="width=' + design_width + ', user-scalable=no, target-densitydpi=device-dpi">');
   }
  }
}).$mount('#app')
