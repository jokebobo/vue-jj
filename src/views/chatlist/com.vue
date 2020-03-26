<template>
  <div>
    <div :class="['hot_com','ft26','mt9',isell?'ells':'']" :style="{height:isell?'90px':'auto'}">{{ hot_com }}</div>
    <p v-show="isall" class="all_com mt9 ft26" @click="showall">{{ isell?'全文':'收起' }}</p>

  </div>
</template>
<script>
export default {
  name: 'com',
  props: ['hot_com'],
  data: function() {
    return {
      isell: true
    }
  },
  computed: {
    isall: function() {
      return this.hot_com.length > 52
    }
  },
  mounted: function() {
    this.isell = this.isall
  },
  methods: {
    showall: function() {
      const isell = this.isell
      this.isell = !isell
    }
  }
}
</script>
