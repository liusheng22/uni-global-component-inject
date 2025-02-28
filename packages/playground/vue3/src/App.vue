<script>
export default {
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

  <style>
view {
  box-sizing: border-box;
}

/* layout */
.flex-c-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-c-s {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.w-full {
  width: 750rpx;
}
.my-100 {
  margin: 100rpx 0;
}
.my-30 {
  margin: 30rpx 0;
}
.my-60 {
  margin: 60rpx 0;
}
.px-30 {
  padding: 0 30rpx;
}
.color-red {
  color: red;
}
.color-green {
  color: green;
}
.color-blue {
  color: blue;
}
/* 代码颜色 */
.color-code {
  color: #999;
}

/* text */
.text-center {
  text-align: center;
}
</style>
