<template>
  <div>

    <inp :value="inpval" @input="inpval=$event" @focus.native="inpfocus" />
    <p>{{ inpval }}</p>

    <!-- <check :checked="checked" @change="checked=$event"></check> -->
    <check v-model="loving" />
    <p>{{ loving }}</p>

    <input v-focus="{'color':'yellow'}" v-plus="1+1" type="text">
    <p>{{ mixdata }}</p>

    <anchored-heading :level="1">Hello world!</anchored-heading>
    <anchored-heading :level="2">Hello world!</anchored-heading>
    <anchored-heading :level="3">Hello world!</anchored-heading>
    <anchored-heading :level="4">Hello world!</anchored-heading>
    <anchored-heading :level="5">Hello world!</anchored-heading>
    <anchored-heading :level="6">Hello world!</anchored-heading>
    <!-- 插槽 -->
    <tembtn>
      hello
    </tembtn>
    <!-- 具名插槽 -->
    <all>
      <template v-slot:p1>this is part1</template>
      <template v-slot:p2>this is part2</template>
      <template v-slot:p3>this is part3</template>
    </all>
    <!-- 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。 -->
    <tem :text="msg">
      <!-- 插槽的作用域和父级的作用域一样，所以访问不到组件内部的text属性， -->
      <template v-slot:content>msg is {{ msg }}</template>
      <template v-slot:default="slotdefault">
        she is
        {{ slotdefault.users.firstName }}
        123
      </template>
      <template v-slot:title="slotTitle">
        this is {{ slotTitle.title }}
      </template>
    </tem>

    <div id="table">
      <tb :data="userlists">
        <col-td label="姓名" keyname="name" />
        <col-td label="年龄" keyname="age" />
        <col-td label="爱好" keyname="hobby" />
        <col-td label="头像" keyname="headImg" />
      </tb>
      <tb :data="goodslist">
        <col-td label="标题" keyname="title" />
      </tb>
    </div>
    <p>{{ plus }}</p>
    <p>{{ num }}</p>
    <button @click="changeNum">change</button>
    <temtxt />
  </div>
</template>

<script>
// 混入对象，如果组件内部有同名的数据属性，方法，则以组件内部优先
// 混入对象的钩子在组件的钩子之前调用
var mixin = {
  created: function() {
    console.log('this is mixfun')
  },
  data: function() {
    return {
      mixdata: 'this is mixdata'

    }
  }
}
export default {
  name: 'Market',
  components: {
    tb: {
      props: ['data'],
      data: function() {
        return {
          keylists: [],
          typename: 'headImg'
        }
      },
      template: "<table><tr ><slot></slot></tr><tr v-for='item in data'><td v-for='keylist in keylists'><img :src='item[keylist]' v-if='keylist==typename'><template v-else>{{item[keylist]}}</template></td></tr></table>",
      mounted: function() {
        console.log(this.$children.map(r => r.keyname
        ))
      }
    },
    colTd: {
      props: ['label', 'keyname'],
      template: '<th>{{label}}</th>',
      created: function() {
        // 每一个新组建colTd创建的时候，prop传值过来的keyname就会添加到父组件的data keylists里面
        this.$parent.keylists.push(this.keyname)
      }
    },
    temtxt: {
      template: "<p @click='changeText'>{{msg}}</p>",
      data: function() {
        return {
          msg: 'hello jquery'
        }
      },
      methods: {
        changeText: function() {
          this.msg = 'hello vue'
          console.log(this.$el, this.$el.textContent)// hello jquery
          this.$nextTick(function() {
            console.log(this.$el, this.$el.textContent)// hello vue
          })
        }
      }
    },
    tem: {
      props: ['text'],
      template: "<p><slot :users='users'>{{users.lastName}}</slot><span>这是标题</span><slot name='title' :title='title'>this is title</slot><span>这是正文</span><slot name='content'></slot></p>",
      data: function() {
        return {
          users: {
            firstName: 'jack',
            lastName: 'pumpkin'
          },
          title: 'hello vue'
        }
      }
    },
    all: {
      template: "<div><p>p1</p><slot name='p1'></slot><p>p2</p><slot name='p2'></slot></div>"
    },
    tembtn: {
      template: '<button><slot>submit</slot></button>'
    },
    anchoredHeading: {
      props: ['level'],
      render: function(createElement) {
        return createElement('h' + this.level, this.$slots.default)
      }
    },
    inp: {
      name: 'inp',
      props: ['value'],
      template: "<label><input type='text' :value='value'   v-on='inputListener'/></label>",
      computed: {
        inputListener: function() {
          var that = this
          return Object.assign({},
            that.$listeners,
            {
              input: function($event) {
                that.$emit('input', $event.target.value)
              }
            })
        }
      }
    },
    check: {
      name: 'check',
      props: ['checked'],
      model: {
        prop: 'checked',
        event: 'change'
      },
      template: "<input type='checkbox' :checked='checked' @change='change($event.target.checked)'/>",
      methods: {
        change: function(e) {
          this.$emit('change', e)
        }
      }
    }
  },
  // 自定义指令
  directives: {
    focus: {
      bind: function() {
        // 指令绑定到元素时调用
        console.log('bind')
      },
      inserted: function(el, binding, vnode) {
        // 元素被插入父节点的时候调用，
        el.focus()
        // binding.value
        el.style.color = binding.value.color
        console.log('3333')
        console.log(el)
        console.log(vnode)
        el.innerHtml = '<p>hello world</p>'
      },
      update: function() {
        // 所在组件vnode更新时调用,可能在子vnode更新之前
        console.log('update')
      },
      componentUpdated: function() {
        // 所在组件vnode并且子vnode更新时调用
        console.log('component')
      },
      unbind: function() {
        // 指令解绑时调用
        console.log('unbind')
      }
    },
    plus: {
      inserted: function(el, binding, vnode) {
        // 指令绑定的值
        el.value = binding.value
        // 字符串形式的表达式
        el.value = binding.expression
      }
    }
  },

  mixins: [mixin],
  data: function() {
    return {
      msg: 'hello jquery',
      num: 10,
      inpval: 'hello vue',
      checked: true,
      loving: true,
      mixdata: 'this is market',
      users: {
        firstName: 'hello',
        lastName: 'world'
      },
      userlists: [
        { id: 1, name: 'Simba', age: 20, hobby: 'sing', headImg: require('../../assets/chat.png') },
        { id: 2, name: 'jack', age: 25, hobby: 'dance', headImg: require('../../assets/chat.png') },
        { id: 3, name: 'rose', age: 30, hobby: 'reading', headImg: require('../../assets/chat.png') }
      ],
      goodslist: [
        { id: 1, title: 'hello' },
        { id: 2, title: 'world' },
        { id: 3, title: 'javascript' }
      ]

    }
  },
  computed: {
    plus: {
      get: function() {
        return this.num + 1
      },
      set: function(v) {
        this.num = v - 1
      }
    }
  },
  created: function() {
    var fn = x => x * x
    console.log('fn 执行结果是：', fn(5))

    var plus = (x, y) => x + y
    console.log('plus执行结果是：', plus(5, 5))

    var plusall = (x, y, ...rest) => {
      var sum = x + y
      for (let i = 0; i < rest.length; i++) {
        sum += rest[i]
      }
      return sum
    }
    console.log('plusall执行结果是：', plusall(1, 2, 3, 4, 5))

    var person = {
      birth: '1993',
      callBirth: function() {
        var b = this.birth// 1993
        fn = () => {
          return '出生日期：' + this.birth
        }
        return fn()
      }
    }
    console.log(person.callBirth())
    var singname = 'rib'
    var person2 = {
      singname: 'luz',
      sayName: function() {
        return () => {
          return this.singname
        }
      }
    }
    console.log(person2.sayName()())

    var person3 = {
      birth: '1993',
      getAge: function(y) {
        var b = this.birth
        var fn = (y) => {
          return y - this.birth
        }
        return fn.call({ birth: 2000 }, y)
      }
    }
    console.log(person3.getAge(2019))// 26,
    console.log('this is marketfun')
    // 变量名与属性名一致的写法
    const { foo, boo } = { foo: 'aaa', boo: 'bbb' }
    console.log(foo, boo)
    // 变量名与属性名不一致的写法
    const { foo: baz } = { foo: 'aaa' }
    console.log(baz)
    const { log } = console
    log('hello vue 333')

    const obj = {
      p: ['hello', { y: 'vue' }]
    }
    const { p: p, p: [a, { y: y }] } = obj
    console.log(p, a, y)
    const node = {
      loc: {
        start: {
          line: 1,
          column: 5
        }
      }
    }
    const { loc, loc: { start }, loc: { start: { line, column }}} = node
    console.log(loc)// {start:{}}
    console.log(start)// {line:,column:}
    console.log(line, column)// 1,5
    const name = 'jack'
    const msg = 'hello vue'
    // 模板字符串
    console.log(`${name} says ${msg}`)
    const temp1 = function(addrs) {
      return `<table>${addrs.map(function(addr) {
        return `<tr><td>${addr.first}</td><td>${addr.last}</td></tr>`
      })}</table>`
    }
    const data = [
      { first: '<Jane>', last: 'Bond' },
      { first: 'Lars', last: '<Croft>' }
    ]
    console.log('table is', temp1(data))
  },
  methods: {
    changeText: function() {
      this.msg = 'hello vue'
      console.log(this.$el)
      /* this.$nextTick(function () {
        console.log(this.$el.textContent)
      }) */
    },
    changeNum: function() {
      this.num = 15
    },
    inpfocus: function() {
      alert('hello world')
    },
    unbind: function() {
      app.$destroy
    }
  }
}

</script>
