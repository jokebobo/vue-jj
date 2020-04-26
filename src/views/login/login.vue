<template>
    <div>
        <div class="top top1 rela">
            <a class="iconfont icon-jiantou abs backarr"></a>
            <h5>登录</h5>
        </div>
        <form action="">

            <div class="form_group">
                <label for="">用户名</label><input type="text" v-model="username" @blur="testname">
            </div>
            <div class="form_group">
                <label for="">密码</label><input type="text" v-model="pwd">
            </div>
            <input type="button" value="登录" @click="login">
        </form>
    </div>
    

</template>
<style rel="stylesheet" scoped>
  @import '~@/assets/css/bootstrap.min.css';
  @import '~@/assets/css/all.css';
  form{
      text-align:center;
      margin-top: 30%;
  }
  .form_group{
    font-size:26px;
  }
  .form_group label{
      width:100px;
      text-align-last:justify;
      text-align:justify;
      margin-right: 15px;
  }
  .form_group:nth-child(2){
      margin-top: 25px;
  }
  input[type='text']{
      border:1px solid #ccc;
  }
  input[type='button']{
      font-size:26px;
      margin-top:25px;
      padding:10px;
  }
</style>
<script>
    import {mapState,mapMutations} from 'vuex'
    import {setToken,getToken} from '~@/utils/auth'
    import {login} from '~@/apis/api2'
    export default{
        name:'login',
        data:function(){
            return {
                pathname:'',
                username:'',
                pwd:''
            }
        },
        filters:{
            testname:function(){
                var {username}=this;
                console.log("用户名",username);
            }
        },
        created:function(){
            console.log("路由信息",this.$route);
            console.log("页面参数",this.chatId)
        },
        computed:{
            ...mapState({
                //话题讨论页面的参数
                chatId:state=>state.chatId,
                userinfo:state=>state.userinfo
            })
        },
        beforeRouteEnter(to,from,next){
            console.log("上一步页面",from);
            next(vm=>{
                // 通过 `vm` 来访问组件实例
                //记录上一个页面的路径
                vm._data.pathname=from.name;
                
            })
            console.log("目标页面",to);
        },
        methods:{
            ...mapMutations([
                'setUser'
            ]),
            testname:function(){
                var {username}=this;
                if(!(/^1[3456789]\d{9}$/.test(username))){ 
                    alert("用户名格式错误");  
                    return false; 
                } 
            },
            login:function(){
                //用户登录
                
                var {pathname,username}=this;
                //判断用户名
                if(this.username==""){
                    alert("用户名不能为空");
                }
                //判断密码
                if(this.pwd==""){
                    alert("密码不能为空");
                }
                if(this.username!=""&&this.pwd!=""){
                    var access_token=this.username; 
                    setToken("loginToken098",access_token);
                    login(username).then((res)=>{
                        console.log("登录信息",res)
                        alert(res.data.msg);
                        var data=res.data;
                        if(data.code==1){
                            //用户登录成功
                            console.log("获取用户信息",data.user);
                            this.setUser({user:data.user})
                            //登录成功后跳转回上一个页面
                            this.$router.replace({name:pathname,params:{id:this.chatId}})
                        }
                        
                    }).catch((error)=>{

                        console.log(error)
                    })
                    
                    //this.$router.replace({name:pathname,params:{id:this.chatId}})

                }
                
            }
        }
    }
</script>