<template>
  <view v-if="tips">
    <h5>{{ tips }}</h5>
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
