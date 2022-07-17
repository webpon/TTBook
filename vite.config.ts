import { defineConfig } from "vite";

import uni from "@dcloudio/vite-plugin-uni"
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite';

import viteCompression from 'vite-plugin-compression'
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import Rmovelog from 'vite-plugin-removelog'
import { VitePWA } from 'vite-plugin-pwa'
import plugin from 'windicss/plugin'
import uniTwuCssPlugin from 'vite-plugin-uni-twucss';
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup';
/* 自定义插件 */
// 根据page.json自动生成对应文件
import vitePluginTemplate from './src/utils/viteCustomPlugins/autoAddPage'

/* 是否为生产模式 */
const isProduction = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? './' : '',
  resolve: {
    alias: {
      assets: "@/assets",
      static: "@/static",
      store: "@/store",
      components: "@/components",
      network: "@/network",
      pages: "@/pages",
      hooks: '@/hooks',
      mixins: '@/mixins'
    },
    // 忽略引入后缀名
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [
    // VitePWA(),
    uni(),
    // 自定义的插件，当page.json的更新时自动生成对应的组件
    vitePluginTemplate(),
    WindiCSS({  
      scan: {  
          dirs: ['.'], // 当前目录下所有文件  
          fileExtensions: ['vue', 'js', 'ts'], // 同时启用扫描vue/js/ts  
      },  
  }),  
    // gzip压缩
    // viteCompression(),
    AutoImport({
      // 按需引入TDesign-mobile组件
      // resolvers: [TDesignResolver({
      //   library: 'mobile-vue'
      // })],
      // 自动导入vue相关的Api
      imports: ["vue", "pinia"],   // 也支持vue-router、axios等
      // 声明文件的存放位置
      dts: 'auto-imports.d.ts',
      // 解决eslint报错问题
      eslintrc: {
        enabled: true
      }
    }),
    // 按需注册TDesign-mobile组件
    // Components({
    //   resolvers: [TDesignResolver({
    //     library: 'mobile-vue'
    //   })],
    // }),
    // 生产环境下移除 console.log, console.warn, console.error
    MiniProgramTailwind()
  ],
  // Rmovelog(),
  build: {
    // 压缩代码brotliSize: true // 默认为 true
  }
});
