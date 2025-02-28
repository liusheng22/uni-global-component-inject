// 检测 Vue 版本
function detectVueVersion() {
  try {
    // 通过项目根目录解析 package.json
    const pkgPath = require.resolve('vue/package.json', {
      paths: [require.main.paths[0]] // 从主模块解析路径
    })
    const { version } = require(pkgPath)
    return parseInt(version.split('.')[0])
  } catch (e) {
    console.error('无法检测 Vue 版本:', e.message)
    return 2
  }
}

module.exports = function (...args) {
  const version = detectVueVersion()
  if (version === 2) {
    const webpackLoader = require('./loader.js')
    return webpackLoader.apply(this, args)
  } else if (version === 3) {
    const vitePlugin = require('./vite.js')
    return vitePlugin.apply(this, args)
  }
}
