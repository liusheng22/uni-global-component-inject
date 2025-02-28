<template>
  <view :style="{height: '1px', overflow: 'hidden'}">
    <movable-area class="movable-area">
      <movable-view
        class="movable-view"
        direction="all"
        damping="40"
        :x="position.x"
        :y="position.y"
        :animation="true"
        @tap="clickHandle"
      >
        <view :style="{fontSize: '36rpx'}">{{label}}</view>
      </movable-view>
    </movable-area>
  </view>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      position: {
        x: 300,
        y: 600
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initPosition()
    })
  },
  methods: {
    initPosition () {
      let { screenWidth, screenHeight } = uni.getSystemInfoSync()
      this.position = {
        x: screenWidth - 100,
        y: screenHeight - 200
      }
    },
    clickHandle() {
      this.$emit('movableClick')
    }
  }
}
</script>

<style scoped>
.movable-area {
  width: 750rpx;
  height: 100vh;
}
.movable-view {
  width: 120rpx;
  height: 120rpx;
  position: fixed;
  border-radius: 100%;
  padding: 10rpx;
  z-index: 10;
  background: linear-gradient(90deg,rgba(255,104,74,1) 0%,rgba(249,65,51,1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
</style>
