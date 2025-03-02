# 简介

一个为 `uniapp(uni-app)` 项目注入全局组件的工具，它支持 `Vue2`（基于 Webpack）和 `Vue3`（基于 Vite）项目，让你的 `App` 也能够拥有全局组件。

## 特性

- 支持 UniApp Vue 2（Webpack）和 Vue 3（Vite）项目。
- 通过 pages.json 配置哪些全局组件。
- 自动合并组件的脚本、模板和样式。
- 提供灵活的排除机制，允许特定页面跳过注入。

## 配置过程 [切换到VUE2配置](https://github.com/liusheng22/uni-global-component-inject/blob/main/packages/global-inject/README.md)
### 第一步 安装依赖
```bash
pnpm add uni-global-component-inject -D
```
### 第二步 配置 Loader
在 vue.config.js 中配置 Loader：
```javascript
import uni from '@dcloudio/vite-plugin-uni'
import uniGlobalComponentPlugin from 'uni-global-component-inject/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    uni(),
    uniGlobalComponentPlugin({
      platforms: ['app-plus']
    })
  ]
})

```

### 第三步 创建全局组件 `CustomModal`

> uni-app 的全局组件 easycom 可以了解一下 [easycom配置](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom) & [easycom规范](https://uniapp.dcloud.net.cn/component/#easycom)

简单说就是在 `components` 目录下创建 `components/CustomModal/CustomModal.vue` 文件，然后在任意页面写下 `<CustomModal />` 组件标签，该页面就自动导入该组件进行使用了。

### 第四步 配置 `pages.json` 文件添加 `injectLoader`
```json
"injectLoader": {
  // 将 <CustomModal /> 作为全局组件注入到所有页面
  "injectTags": [
    {
      // 必填，指的是 components 目录下的你的组件名称
      "name": "CustomModal"
    }
  ],
  "rootEle": "view"
}
```

### 第五步 重新编译项目
> 重新编译项目，在每个页面都会自动注入 `<CustomModal />` 组件了。

## 案例运行
<details>
<summary>点击查看 项目示例</summary>

- [完整项目示例代码 - uni-global-component-inject-monorepo](https://github.com/liusheng22/uni-global-component-inject)
- 项目是 `monorepo` 项目，在根目录下执行 `pnpm i` 安装依赖
- `packages/playground` 目录下的有 `vue2/vue3` 完整项目示例
- `packages/global-inject` 目录下是 `loader/plugin` 的源码

</details>

## 配置选项
### vue.config.js 配置选项
```javascript
options: {
  // 必填：指定的平台才生效。例如 ['app-plus','mp-weixin']
  platforms: ['app-plus'],
  // 可选：指定自定义的 pages.json 文件路径（默认值为 'src/pages.json'）
  pagesPath: path.resolve(__dirname, './src/pages.json')
}
```

### pages.json 配置选项
```json
"injectLoader": {
  // 以标签的形式插入到每一个页面
  "injectTags": [
    {
      "name": "CustomModal",
      // 自定义注入的标签的 参数/回调函数
      "element": "<CustomModal :title=\"title\" @close=\"closeHandle\" />",
      // 排除哪些页面不需要注入该 CustomModal 全局组件
      "excludes": ["pages/about"]
    }
  ],
  // 排除哪些页面不需要注入任何的全局组件
  "excludeTagsPaths": ["pages/setting"],
  // 必填，填写你的项目所有页面的根元素是: view / div
  "rootEle": "view"
}
```

## 常见问题

> 1. 如果让特定页面不注入任何的全局组件？

```json
"injectLoader": {
  "injectTags": [...],
  // 排除哪些页面不需要注入任何的全局组件
  "excludeTagsPaths": ["pages/about"]
}
```

> 2. 如何让特定页面不注入某个全局组件？

```json
"injectLoader": {
  "injectTags": [
    {
      "name": "CustomModal",
      // 排除哪些页面不需要注入该 CustomModal 全局组件
      "excludes": ["pages/about"]
    }
  ]
}
```

> 3. 如何自定义全局组件的注入标签的 `参数/回调`？

```json
"injectLoader": {
  "injectTags": [
    {
      "name": "CustomModal",
      // 自定义注入的标签的 参数/回调函数
      "element": "<CustomModal :title=\"title\" @confirm=\"confirmHandle\" />",
    }
  ]
}
```

> 4. 指定仅特定的平台才使用全局组件注入？
```javascript
options: {
  // 必填，指定的平台才生效。例如 ['app-plus','mp-weixin']
  platforms: ['app-plus']
}
```

## 许可证
[MIT License](LICENSE)

