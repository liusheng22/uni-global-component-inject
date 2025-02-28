<template>
  <view class="content">
    <h1 style="margin: 50px 0;">
      {{ title }}
    </h1>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      tips: 'Hello 页面：到底了～'
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
