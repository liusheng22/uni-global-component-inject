<template>
  <view class="w-full my-30 px-30">
    <h3>跳转页面</h3>
    <navigator
      v-for="route in routes"
      :key="route.name"
      :url="route.path"
      open-type="navigate"
      hover-class="navigator-hover"
      :style="{ width: 'auto' }"
    >
      <button style="color: blue">
        跳转至 {{ route.name }} 页面
      </button>
    </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          path: '/pages/hello',
          name: 'Hello',
        },
        {
          path: '/pages/movable',
          name: 'Movable',
        }
      ]
    }
  },
  mounted() {
    const currentPage = getCurrentPages()
    const currRoute = currentPage[currentPage.length - 1].route
    this.routes = this.routes.filter(route => route.path !== `/${currRoute}`)
  }
}
</script>