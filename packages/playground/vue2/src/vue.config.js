const path = require('node:path')
const { defineConfig } = require('@vue/cli-service')

// src 的工程目录下的 vue.config.js
const projectRoot = path.resolve(__dirname, '../')
const uniGlobalComponentInject = path.resolve(projectRoot, 'node_modules/uni-global-component-inject/index.js')

// 使用 configureWebpack 配置 loader
module.exports = defineConfig({
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: uniGlobalComponentInject,
          options: {
            platforms: ['app-plus']
          }
        }
      ]
    }
  }
})

// 使用 chainWebpack 配置 loader
// module.exports = defineConfig({
//   chainWebpack: (config) => {
//     config.module
//       .rule('vue')
//       .use('uni-global-component-inject')
//       .loader(uniGlobalComponentInject)
//       .tap((options) => ({
//         ...options,
//         platforms: ['app-plus'],
//       }));
//   },
// });
