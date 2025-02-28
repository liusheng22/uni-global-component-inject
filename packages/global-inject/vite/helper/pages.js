const fs = require('fs')
const path = require('path')
const stripJsonComments = require('strip-json-comments')
const { InjectLoader } = require('./inject')

class PagesLoader {
  constructor(root, options) {
    this.root = root
    this.options = options
    this.pagesJson = {}
    this.injectLoader = null
  }

  init() {
    const pagesPath = this.getPagesPath()
    this.pagesJson = JSON.parse(
      stripJsonComments(fs.readFileSync(pagesPath, 'utf8'))
    )
    this.injectLoader = new InjectLoader(this.pagesJson)
    return this.injectLoader.init()
  }

  getPagesPath() {
    if (this.options.pagesPath) {
      return path.resolve(this.options.pagesPath, '../')
    }
    return path.resolve(this.root, 'pages.json')
  }

  getPagesMap() {
    const pages = this.pagesJson.pages || []
    const subpackages =
      this.pagesJson.subpackages || this.pagesJson.subPackages || []

    const mainPages = pages.reduce((obj, item) => {
      const curPage = this.injectLoader.getLabelConfig(item)
      curPage.isInject && (obj[`/${item.path}`] = curPage)
      return obj
    }, {})

    return subpackages.reduce((obj, item) => {
      const root = item.root
      item.pages.forEach((page) => {
        const curPage = this.injectLoader.getLabelConfig(page)
        curPage.isInject && (obj[`/${root}/${page.path}`] = curPage)
      })
      return obj
    }, mainPages)
  }
}

module.exports = {
  PagesLoader
}
