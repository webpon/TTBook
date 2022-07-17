import type { PluginOption } from "vite";
import fs from "fs";
import path from 'path'

function addPage(file: string) {
  if (/.+(src(\\|\/)pages\.json)/.test(file)) {
    const pagesStr = fs.readFileSync(file, "utf-8");
    const pagesJson = JSON.parse(pagesStr);
    // tabBar页面
    const tabBarPages = pagesJson.pages.map((i: any) => {
      return {
        type: "tabBarPage",
        rootPath: `./src/${i.path}`.replace(/(.+)\/.+/, ($1, $2) => $2),
        name: `./src/${i.path}`.replace(/.+\/(.+)/, ($1, $2) => $2),
        path: `./src/${i.path}`,
        title: i.style.navigationBarTitleText,
      };
    });
    // 分包页面
    const subPages = pagesJson.subPackages.flatMap((i: any) => {
      return i.pages.map((x: any) => {
        return {
          type: "subPage",
          rootPath: path.resolve(process.cwd(), `./src/${i.root}`),
          name: i.name,
          path: path.resolve(process.cwd(), `./src/${i.root}/${x.path}`),
          title: x.style.navigationBarTitleText,
        };
      });
    });
    // 当前已有页面
    const pages = [...tabBarPages, ...subPages];

    // 添加新路由
    function addPages(pages: any) {
      for (const page of pages) {
        const { name, title, path: pagePath, rootPath } = page;
        if (fs.existsSync(pagePath + ".vue")) continue;
        try {
          fs.mkdirSync(rootPath, { recursive: true });
        } catch (error) {
          console.error(error);
        }
        const filePath = `${pagePath}.vue`;
        const createStream = fs.createWriteStream(filePath);
        const template = `<template>
<view>
  ${title}
</view>
</template>

<script setup lang="ts" name="${name}">

</script>

<style scoped lang="scss">

</style>
`;
        createStream.write(template);
        createStream.end();
        console.log("\x1B[34m", `pages ${name} created successfully.`);
      }
      console.log(
        "\x1B[32m%s\x1B[39m",
        "\n All files are created successfully.\n"
      );
    }
    addPages(pages);
  }
}
export default function vitePluginTemplate(): PluginOption {
  return {
    // 插件名称
    name: "vite-plugin-template",
    // pre 会较于 post 先执行
    enforce: "pre", // post
    renderStart(outputOptions, inputOptions) {},

    config(config, { command }) {},
    configResolved(resolvedConfig) {},
    configureServer(server) {},

    transformIndexHtml(html) {},
    // 每次热更新触发
    handleHotUpdate(ctx) {
      addPage(ctx.file);
    },
    // rollup的钩子，微信小程序打包用他的
    watchChange(file) {
      addPage(file);
    },
  };
}
