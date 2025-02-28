<template>
  <view class="content">
    <h1 style="margin: 50px 0;">{{ title }}</h1>
    <h4 class="px-30">
      <p>全局组件 CustomTips 的<text class="color-red">标签</text>不会注入到该页面</p>
    </h4>

    <view class="my-30 flex-c-c flex-col">
      <h3>配置代码：</h3>
      <pre class="flex-c-s color-code">
        /* pages.json */

        "injectTags": [
          {
            "name": "CustomTips",
            "element": ...,
            "excludes": ["pages/no-inject-tags"]
          }
        ]
      </pre>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'No Inject Tags',
        tips: 'No Inject Tags 页面：到底了～'
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
