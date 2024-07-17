# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## 模板简介

* electron:22 版本，支持 win7（官网说支持，还未在实机上测试过）
* electron-store: 电脑本地存储，位置类似 C:\Users\[用户]\AppData\Roaming\[项目名]，作用：可根据项目不同配置地址
* sass
* mockjs
* svgicon:已自动配置组件，用法<SvgIcon name="renwen" :size="15" style="color: pink"></SvgIcon>，svg 文件放置 assets/icons
* unplugin-auto-import：可自动导入组件
* axios
* pinia
* vue-router
* element-plus
* vue-i18n: 国际化
* typescript
* electron-log: 日志记录，存于C:\Users\[用户]\AppData\Roaming\[项目名]\logs
* electron-updater: 软件更新，生产环境下更新地址为electron-builder.json5的publish.url, 开发环境为根目录下的dev-app-update.yml文件。打包后需将新版安装包和latest.yml一并放在更新地址下，更新后的缓存文件一般在电脑的C:\Users\[用户]\AppData\Local\[项目名-updater]。更新弹窗已封装成组件。
* vuetools6.5.1: vue 的 devtool 拓展，因为 electron 版本号不对，很难用依赖方法将其装上,因此找到了适配 22 版本的 plugin，并将其以源文件形式引入。如果主动将 electron 升级为更高版本，此 devtool 将无法生效，可参考使用 vite-plugin-vue-devtools 插件
* favio：如果要修改打包的图标，修改 electron-builder.json5 文件的 nsis 和 win 选项
* eslint+prettier 增加了eslint和prettier配置，打包时会校验规则

## 有必要记住的快捷键

打开控制台: ctrl+shift+i
全屏: F11
最小化: ctrl+m
关闭: ctrl+w
主动重载： ctrl+r,ctrl+shift+r
