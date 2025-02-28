<template>
  <view>
    <!-- button -->
    <view class="w-full my-30 px-30">
      <h3>弹窗操作</h3>
      <view>
        <button @click="visible = true">打开全局组件弹窗</button>
      </view>
    </view>

    <!-- modal -->
    <view class="custom-modal" v-if="visible">
        <!-- overlay -->
        <view class="custom-modal__overlay" @click="close"></view>
  
        <!-- wrapper -->
        <view class="custom-modal__wrapper">
          <!-- title -->
          <view class="custom-modal__title">{{ title }}</view>
          <!-- content -->
          <view class="custom-modal__content">
              <div>这是「{{ title }}」页面的弹窗</div>
          </view>
  
          <!-- action -->
          <view class="custom-modal__action">
            <button class="custom-modal__action-btn" @click="confirm">确认</button>
            <button class="custom-modal__action-btn" @click="close">取消</button>
          </view>
        </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const visible = ref(true)

const confirm = () => {
  visible.value = false
  uni.showToast({
    title: '点击了确认',
    icon: 'none',
    duration: 2000
  })
}
const close = () => {
  visible.value = false
  uni.showToast({
    title: '点击了取消',
    icon: 'none',
    duration: 2000
  })
}

</script>

<style scoped>
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.custom-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.custom-modal__wrapper {
  position: relative;
  width: 80%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
}
.custom-modal__title {
  background-color: #333;
  color: #fff;
  padding: 15px;
  z-index: 1;
}
.custom-modal__content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  z-index: 1;
}
.custom-modal__action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 1;
}
.custom-modal__action-btn {
  padding: 0 20px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}
</style>
