import uni from '@dcloudio/vite-plugin-uni'
import uniGlobalComponentPlugin from 'uni-global-component-inject'
import { defineConfig } from 'vite'

console.log('🚀 ~ uniGlobalComponentPlugin:', uniGlobalComponentPlugin)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    uniGlobalComponentPlugin({
      platforms: ['app-plus']
    })
  ]
})
