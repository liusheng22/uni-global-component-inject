<template>
  <view v-if="tips">
    <h5>{{ tips }} 页面：到底了～</h5>
  </view>
</template>

<script>
export default {
  props: {
    tips: {
      type: String,
      default: ''
    }
  }
}
</script>
