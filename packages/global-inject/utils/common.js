// 当前路由的 pages 配置
function getRoute(resourcePath, rootPath) {
  rootPath =
    rootPath || process.env.UNI_INPUT_DIR || `${process.env.INIT_CWD}\\src`
  return resourcePath
    .replace(rootPath, '')
    .replace('.vue', '')
    .replace(/\\/g, '/')
}

// 将字符串: test-demo-components  转为testDemoComponents
const toCamelCase = (str) => {
  return str.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

module.exports = {
  getRoute,
  toCamelCase
}
