const { toCamelCase } = require('../../utils/common')
const { isArray } = require('../../utils/data-type')

function getInjectElements(injectTags, route) {
  return (
    injectTags
      .filter((tag, index) => validateTagExcludes(tag, index, route))
      // .map((tag) => tag.element)
      .map((tag) => {
        const labelCamelCase = toCamelCase(tag.name)
        return tag.element
          ? tag.element
          : `<${tag.name} />`
      })
      .join('\n      ')
  )
}

function validateTagExcludes(tag, index, route) {
  const { excludes } = tag
  if (!excludes) {
    return true
  }
  if (!isArray(excludes)) {
    console.warn(
      `pages.json config error, injectTags[${index}].excludes must be an array`
    )
    return true
  }
  return !excludes.includes(route.substring(1))
}

function transformTemplate(templateContent, ele, injectElements) {
  const targetEndTag = `</${ele}>`
  const insertPosition = templateContent.lastIndexOf(targetEndTag)
  if (insertPosition === -1) {
    console.warn(`未找到 ${targetEndTag}，无法注入组件`)
    return templateContent
  }
  return `${templateContent.slice(
    0,
    insertPosition
  )}  ${injectElements}\n${templateContent.slice(insertPosition)}`
}

function buildSFCContent(descriptor, templateContent) {
  let content = ''
  if (descriptor.template) {
    content += `<template>\n${templateContent}\n</template>\n`
  }
  if (descriptor.script) {
    content += `<script>\n${descriptor.script.content}\n</script>\n`
  }
  if (descriptor.scriptSetup) {
    content += `<script setup>\n${descriptor.scriptSetup.content}\n</script>\n`
  }
  if (descriptor.styles?.length) {
    descriptor.styles.forEach((style) => {
      content += `<style${style.scoped ? ' scoped' : ''}>\n${
        style.content
      }\n</style>\n`
    })
  }
  return content
}

module.exports = {
  getInjectElements,
  transformTemplate,
  buildSFCContent
}
