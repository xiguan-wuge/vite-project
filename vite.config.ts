import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
import {resolve} from 'path'
import viteCompression from 'vite-plugin-compression'
import {viteMockServe} from 'vite-plugin-mock'
import postcssPxToViewport from "postcss-px-to-viewport"
import uglifyHtmlPlugin from './src/plugins/uglifyHtmlPlugin/index.ts'

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
    }),
    viteMockServe({
      mockPath: './src/mock/',
      supportTs: true
    }),
    uglifyHtmlPlugin()
    
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3008
  },
  css: {
    postcss: {
      plugins: [
        postcssPxToViewport({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 375, // UI设计稿的宽度
          unitPrecision: 3, // 转换后的精度，即小数点位数
          propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: [], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          exclude: [],
          landscape: false, // 是否处理横屏情况
        })
      ]
    }
  }
})
