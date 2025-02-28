const { DEFAULT_ROOT_ELE } = require('../../constants')
const { isArray } = require('../../utils/data-type')

class InjectLoader {
  constructor(pagesJson) {
    this.config = pagesJson.injectLoader || {}
    this.init()
  }

  init() {
    this.config.injectTags = this.config.injectTags || []
    this.config.rootEle = this.config.rootEle || DEFAULT_ROOT_ELE
    return true
  }

  getLabelConfig(json) {
    const { path, style } = json || {}
    const excludeTagsPaths = this.validateExcludePaths(
      this.config.excludeTagsPaths
    )

    const isCurrInsert = style && style.injectTags
    const isInject = isCurrInsert || this.config.injectTags.length

    const finalInjectTags = this.getFinalInjectTags(
      path,
      style,
      excludeTagsPaths
    )

    return {
      isInject,
      injectTags: finalInjectTags,
      ele: (style && style.rootEle) || this.config.rootEle
    }
  }

  validateExcludePaths(excludeTagsPaths) {
    if (excludeTagsPaths && !isArray(excludeTagsPaths)) {
      console.error(
        'pages.json config error, injectLoader.excludeTagsPaths must be an array'
      )
      return []
    }
    return excludeTagsPaths || []
  }

  getFinalInjectTags(path, style, excludeTagsPaths) {
    if (style && style.injectTags) {
      return style.injectTags
    }
    return excludeTagsPaths.includes(path) ? [] : this.config.injectTags
  }
}

module.exports = {
  InjectLoader
}
