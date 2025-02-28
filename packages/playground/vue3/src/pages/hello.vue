<template>
  <view class="content">
    <h1 style="margin: 50px 0;">{{ title }}</h1>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Hello')
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
