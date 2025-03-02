# uni-app 全局组件注入项目示例

## 介绍
这是一个 monorepo 的示例项目，演示了如何使用 `uni-global-component-inject` 插件来实现全局组件的注入。

## 运行示例项目
### 1. 克隆本仓库到本地
```bash
git clone https://github.com/liusheng22/uni-global-component-inject.git
```

### 2. 安装依赖
```bash
pnpm i
```

### 3. HBuilderX 打开项目
- vue2 示例 导入项目目录 `packages/playground/vue2`
- vue3 示例 导入项目目录 `packages/playground/vue3`

### 4. 运行项目
- HBuilderX - 运行 - 运行到手机或模拟器 - 运行到iOS 模拟器App基座
- 编译完成，即可看见页面上自动引入了 `<CustomModal />` 组件了。

## 使用文档
### `vue2 loader`: [vue.config.js 配置文档](packages/global-inject/README.md)
### `vue3 plugin`: [vite.config.js 配置文档](packages/global-inject/README_VUE3.md)
