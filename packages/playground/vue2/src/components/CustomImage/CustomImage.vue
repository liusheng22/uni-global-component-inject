<template>
  <view>
    <view class="px-30 flex-c-c flex-col">
      <image :style="{ width: '72px', height: '72px' }" src="/static/logo.png"></image>
      <h5>该自定义图片组件，是单独注入到 album 页面，配置如下</h5>
    </view>

    <view class="my-30 flex-c-c flex-col">
      <h3>配置代码：</h3>
      <pre class="flex-c-s color-code">
      /* pages.json */

      {
        "path": "pages/album",
        "style": {
          "navigationBarTitleText": "Album",
          "injectCode": [
            { "name": "CustomImage" }
          ]
        }
      }
      </pre>
    </view>
  </view>
</template>

<style scoped>
image {
  animation: shake 1s infinite;
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>