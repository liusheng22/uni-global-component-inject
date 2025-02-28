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
      title: 'Movable',
      tips: 'Movable 页面：到底了～'
    }
  },
  mounted() {

  },
  methods: {
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
