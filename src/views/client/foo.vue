<template>
  <div>
    this is foo
  </div>
</template>
<script>
  export default {
    name: "foo",
    mounted() {
      console.log("组件挂在在实例上面233");
    },
    data: function () {
      return {

      }
    }
  }
</script>
<style scoped>
  div {
    color: coral
  }
</style>