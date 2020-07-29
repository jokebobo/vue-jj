<template>
  <div id="client">
    this is client
    <router-link :to="{name:'index'}">首页</router-link>
    <router-view />
    <router-view name="a" />
    <router-view name="b" />
    <a href="/index">to index</a>
  </div>
</template>
<script>
  export default {
    name: "client",
    data: function () {
      return {}
    },
    created() {
      console.log("client is created");
    }
  }
</script>