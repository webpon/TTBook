import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "class", // or 'media'
  theme: {
    extend: {
      backgroundImage: {
        card: "url('https://img0.baidu.com/it/u=2027576718,1558467707&fm=253')",
        cardFinish: "url('https://img1.baidu.com/it/u=2102877518,3529829397&fm=253')",
        clockLogo: "url('https://img2.baidu.com/it/u=1623276698,3416179149&fm=253')",
      },
    },
  },
  // 自定义原子类
  shortcuts: {
    btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
  },
  preflight: false,
  prefixer: false,
  extract: {
    // 忽略部分文件夹
    exclude: ["node_modules", ".git", "dist"],
  },
  corePlugins: {
    // 禁用掉在小程序环境中不可能用到的 plugins
    container: false,
  },
});
