<template>
    <div class="pop" v-show="isshow">
        最新活动尽情期待
    </div>
</template>
<style>
    .pop{
        width:50%;
        height:100px;
        background: #fff;
        position:fixed;
        left:25%;
        top:20%;
        z-index:10;
        font-size: 25px;
        text-align: center;
        padding:30px 0;
        background:rgba(163, 204, 228, 0.897);
        color:#000;
    }
</style>
<script>
    import {eventBus} from '../utils/event-bus.js'
    export default{
        name:"pop",
        data:function(){
            return {
                isshow:true
            }
        },
        created:function(){
            console.log("2345");
            var _this=this;
            //订阅
            eventBus.$on('closepop',function(){
                console.log("click")
                _this.isshow=false;
            });
        },
        mounted:function(){
            console.log("2345");
            eventBus.$on('closepop',function(){
                this.isshow=false;
            });
        }
    }
</script>