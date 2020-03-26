
const Mock = require('mockjs')
// 模拟后台返回状态码
import message from './message'
// 简单方式使用mockjs模拟数据

// 热门活动模拟数据
var testarr = []
for (let i = 0; i < 2; i++) {
  const data = {
    tit: Mock.Random.ctitle(20),
    starttime: Mock.Random.date('T'),
    endtime: Mock.Random.date('T'),
    pic: Mock.Random.image('275x199', '#ffcc33', '#FFF', 'png', '275x199'),
    bigpower: Mock.Random.image('750x434', '#00405d', '#FFF', 'png', '750x434'),
    id: i
  }
  data.starttime = parseInt(Math.min(data.starttime, data.endtime) / 1000)
  data.endtime = parseInt(Math.max(data.starttime, data.endtime) / 1000)
  testarr.push(data)
}

/* 大家都在讨论数据 */
var chatarr = []
for (let i = 0; i < 10; i++) {
  let chat = {
    tit: Mock.Random.ctitle(20),
    num: parseInt(Math.random() * 600),
    pic: Mock.Random.image('750x424', '#02adea', '#FFF', 'png', '750x424'),
    id: i,
    chatcon: Mock.Random.cparagraph()
  }
  const pinglun = []
  for (let j = 0; j < 10; j++) {
    const pl = {
      userhead: Mock.Random.image('65x65', '#00cc00', '#FFF', 'png', '65x65'),
      hot_name: Mock.Random.cname(),
      hot_date: Mock.Random.date('yyyy-MM-dd'),
      agr_num: parseInt(Math.random() * 600),
      rec_num: parseInt(Math.random() * 600),
      hot_com: Mock.Random.cparagraph(),
      picarrs: [
        Mock.Random.image('219x172', '#ccc000', '#FFF', 'png', '219x172'),
        Mock.Random.image('219x172', '#ccc000', '#FFF', 'png', '219x172'),
        Mock.Random.image('219x172', '#ccc000', '#FFF', 'png', '219x172')
      ]
    }
    pinglun.push(pl)
  }
  chat = Object.assign(chat, { pinglun: pinglun })
  chatarr.push(chat)
}
/* 装修美图 */
var picarr = []
for (let j = 0; j < 10; j++) {
  const pic = {
    pic: Mock.Random.image('344x210', '#ccc000', '#FFF', 'png', '344x210'),
    tit: Mock.Random.ctitle(20)
  }
  picarr.push(pic)
}

/* 装修案例模拟数据 */
var casearr = []
for (let j = 0; j < 10; j++) {
  const casedata = {
    pic: Mock.Random.image('338x226', '#00cc00', '#FFF', 'png', '338x226'),
    num: parseInt(Math.random() * 20),
    area: parseInt(Math.random() * 150),
    com: Mock.Random.ctitle(10),
    type1: Mock.Random.ctitle(3),
    type2: '2室' + parseInt(Math.random() * 4) + '厅' + parseInt(Math.random() * 4) + '卫'
  }
  casearr.push(casedata)
}

var stagearr = ['开工阶段', '水电阶段', '竣工阶段', '验收阶段']
var sitearr = []
for (let j = 0; j < 10; j++) {
  const site = {
    sitename: Mock.Random.ctitle(10),
    price: parseInt(Math.random() * 20),
    stage: stagearr[parseInt(Math.random() * 3)],
    area: parseInt(Math.random() * 150),
    type: Mock.Random.ctitle(3),
    pic: Mock.Random.image('630x457', '#02adea', '#FFF', 'png', '630x457')
  }
  sitearr.push(site)
}

//用户列表
var roles=["15996485308","13851588149"];
//用户登录接口
Mock.mock(new RegExp('/login'),'post',(req)=>{
  var ops = JSON.parse(req.body);
  if(!roles.includes(ops.username)){
    //用户不在列表中
    return{
      code:0,
      msg:"当前用户未注册"
    }
  }else{
    //用户在列表中
    return{
      code:1,
      user:{
        name:ops.username
      },
      msg:"用户登录成功"
    }
  }
})
//记录数据模板，返回相应数据
// Mock.mock(rurl,template)
Mock.mock('/test', message(testarr))
Mock.mock('/chat', message(chatarr))
Mock.mock('/meitu', message(picarr))
Mock.mock('/case', message(casearr))
Mock.mock('/site', message(sitearr))

/* mock接受带参数的链接 */
Mock.mock(new RegExp('/comdata'), 'post', (req) => {
  // 将字符串转化为对象
  var ops = JSON.parse(req.body)
  console.log(ops)
  if (ops.id == '456') {
    return {
      'msg': 'this is 456'
    }
  }
})
