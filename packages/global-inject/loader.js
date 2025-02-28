const fs = require('fs')
const path = require('path')
const { parseComponent } = require('vue-template-compiler')
const { isArray } = require('./utils/data-type')
const injectCodeModuleSnippets = require('./webpack/utils/inject')
const {
  generateHtmlCode,
  generateLabelCode,
  generateStyleCode,
  getPagesMap,
  initPages,
  getRoute
} = require('./webpack/utils/pages')

// 是否初始化过
let _init = false
// 是否需要做处理
let needHandle = false
// 路由和配置的映射关系
let pagesMap = {}

module.exports = function (content) {
  if (!_init) {
    _init = true
    init(this)
  }

  // 配置无效不予处理
  if (!needHandle) {
    return content
  }

  // 获取当前文件的小程序路由
  const route = getRoute(this.resourcePath)
  // 根据路由并找到对应配置
  const curPage = pagesMap[route]
  if (curPage) {
    // 解析sfc
    let compiler = parseComponent(content)
    const { injectCode, injectTags } = curPage || {}
    const isPageHasInjectCode = injectCode && injectCode.length
    const isPageHasInjectTags = injectTags && injectTags.length

    // 插入代码
    if (isPageHasInjectCode) {
      for (let index = 0; index < injectCode.length; index++) {
        const codeItem = injectCode[index]
        const { name: componentName, excludes } = codeItem
        if (!componentName) {
          this.emitError(`Missing 'name' in injectCode[${index}]`)
          continue
        }
        let codeExcludes = excludes || []
        if (!isArray(codeExcludes)) {
          this.emitError(
            `pages.json config error, injectCode[${index}].excludes must be an array`
          )
          codeExcludes = []
        }
        if (!codeExcludes.includes(route.substring(1))) {
          // 获取公共组件路径
          const projectRoot = process.env.UNI_INPUT_DIR || process.env.INIT_CWD
          const modulePath = path.resolve(
            projectRoot,
            'components',
            componentName,
            `${componentName}.vue`
          )
          this.addDependency(modulePath)
          this.addDependency(
            path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
          )

          const injectContent = fs.readFileSync(modulePath, 'utf8')
          // 解析sfc - 最终插入到页面的代码
          const injectCompiler = parseComponent(injectContent)

          // 将 injectCompiler 和 compiler 进行合并
          const result = injectCodeModuleSnippets({
            sourceCompiler: compiler,
            injectCompiler,
            curPage
          })
          content = result.content
          compiler = result.compiler
        }
      }
    }

    // 插入标签
    if (isPageHasInjectTags) {
      // 生成标签代码
      const labelCode = generateLabelCode(injectTags || [], route)
      // 匹配标签位置
      // eslint-disable-next-line no-useless-escape
      const insertReg = new RegExp(`(<\/${curPage.ele}>$)`)
      // 在匹配的标签之前插入额外标签代码
      const templateCode = generateHtmlCode(
        compiler.template.content,
        labelCode,
        insertReg
      )
      // 重组style标签及内容
      const style = generateStyleCode(compiler.styles || [])
      content = `
        <template>
          ${templateCode}
        </template>
        <script>
          ${compiler.script.content}
        </script>
        ${style}
      `
    }
  }
  return content
}

function init(that) {
  const currPlatform = process.env.VUE_APP_PLATFORM
  const { platforms } = that.query || {}
  // 支持的平台
  let supportPlatforms = platforms || []
  if (supportPlatforms) {
    supportPlatforms = isArray(supportPlatforms) ? supportPlatforms : []
  }
  // 平台不一致不予处理
  if (!supportPlatforms.includes(currPlatform)) {
    return
  }
  // 允许的平台 app-plus mp-weixin mp-alipay mp-baidu mp-toutiao
  const allowPlatform = [/mp-[\w]+/, /app-plus/]
  const isLoader = allowPlatform.some((e) => e.test(currPlatform))
  // 首次需要对pages配置文件做解析，并判断是否为有效配置
  needHandle = isLoader && initPages(that)
  // 转换为路由和配置的映射对象
  needHandle && (pagesMap = getPagesMap())
}
