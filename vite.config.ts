import { defineConfig } from "vite";

import uni from "@dcloudio/vite-plugin-uni";
import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";

import viteCompression from "vite-plugin-compression";
import Rmovelog from "vite-plugin-removelog";
import { VitePWA } from "vite-plugin-pwa";
import MiniProgramTailwind from "@dcasia/mini-program-tailwind-webpack-plugin/rollup";
/* 自定义插件 */
// 根据page.json自动生成对应文件
import vitePluginTemplate from "./src/utils/viteCustomPlugins/autoAddPage";

/* 是否为生产模式 */
const isProduction = process.env.NODE_ENV === "production";

const productPlugin = [
  // 开启pwa
  VitePWA(),
  // 生产环境下移除 console.log, console.warn, console.error
  Rmovelog(),
  // gzip压缩
  viteCompression(),
];

// https://vitejs.dev/config/
export default defineConfig({
  server:{https:false}, 
  base: isProduction ? "./" : "",
  resolve: {
    alias: {
      assets: "@/assets",
      static: "@/static",
      store: "@/store",
      components: "@/components",
      network: "@/network",
      pages: "@/pages",
      hooks: "@/hooks",
      mixins: "@/mixins",
    },
    // 忽略引入后缀名
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  plugins: [
    uni(),
    // 自定义的插件，当page.json的更新时自动生成对应的组件
    vitePluginTemplate(),
    WindiCSS({
      scan: {
        dirs: ["."], // 当前目录下所有文件
        fileExtensions: ["vue", "js", "ts"], // 同时启用扫描vue/js/ts
      },
    }),
    AutoImport({
      // 自动导入vue相关的Api
      imports: ["vue", "pinia"], // 也支持vue-router、axios等
      // 声明文件的存放位置
      dts: "auto-imports.d.ts",
      // 解决eslint报错问题
      eslintrc: {
        enabled: true,
      },
    }),
    // 用以处理windicss原子类的一些小程序不能识别的样式
    MiniProgramTailwind(),
    // 生产模式下的配置
    ...(isProduction ? productPlugin : []),
  ],
});
