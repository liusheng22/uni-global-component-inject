<template>
  <view class="content">
    <h1 style="margin: 50px 0;">{{ title }}</h1>
    
    <h4 class="px-30">
      <p>所有全局组件，都不会注入到该页面</p>
      <p>
        在 <text class="color-green">
        injectLoader.excludeTagsPaths
        </text> 中已排除该页面了
      </p>
    </h4>

    <view class="my-30 flex-c-c flex-col">
      <h3>配置代码：</h3>
      <pre class="flex-c-s color-code">
      /* pages.json */

      "injectLoader": {
        "excludeTagsPaths": [
          "pages/no-all-tags"
        ]
      }
      </pre>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'No All Tags',
      tips: 'No All Tags 页面：到底了～'
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
