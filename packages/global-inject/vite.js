const { parse } = require('@vue/compiler-sfc')
const { ALLOWED_PLATFORMS } = require('./constants')
const { getRoute } = require('./utils/common')
const { PagesLoader } = require('./vite/helper/pages')
const {
  getInjectElements,
  transformTemplate,
  buildSFCContent
} = require('./vite/utils/template')

function uniGlobalComponentPlugin(options) {
  const { platforms } = options || {}
  let pagesMap = {}
  let needHandle = false
  let root = ''

  return {
    name: 'uni-global-component-inject',
    enforce: 'pre',
    configResolved(config) {
      root = config.root || process.cwd()
      const isLoader = ALLOWED_PLATFORMS.some((e) => e.test(platforms))

      const pagesLoader = new PagesLoader(root, options)
      needHandle = isLoader && pagesLoader.init()
      needHandle && (pagesMap = pagesLoader.getPagesMap())
    },
    transform(code, id) {
      if (!needHandle || !id.endsWith('.vue')) {
        return null
      }

      const route = getRoute(id, root)
      const curPage = pagesMap[route]
      if (!curPage || !curPage.isInject) {
        return null
      }

      const { descriptor } = parse(code)
      const templateContent = descriptor.template?.content
      if (!templateContent) {
        return null
      }

      const injectElements = getInjectElements(curPage.injectTags, route)
      const transformedContent = transformTemplate(
        templateContent,
        curPage.ele,
        injectElements
      )

      return {
        code: buildSFCContent(descriptor, transformedContent),
        map: null
      }
    }
  }
}

module.exports = uniGlobalComponentPlugin
