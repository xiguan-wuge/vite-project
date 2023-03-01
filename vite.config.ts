import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
import {resolve} from 'path'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    visualizer({
      open:true,
      gzipSize: true,
      brotliSize: true
    }),
    viteCompression({
      threshold: 1024000, // 对大于1M的文件开启gzip压缩
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3008
  }
})
