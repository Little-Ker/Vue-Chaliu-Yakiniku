const { defineConfig } = require('@vue/cli-service')
const Components = require('unplugin-vue-components/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const { VarletUIResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       additionalData: `
  //         @import "~@/assets/sass/variable.sass"
  //         @import "~@/assets/sass/main.sass"
  //         @import "~@/assets/sass/reset.sass"
  //         @import "~@/assets/sass/icon.sass"
  //       `,
  //     },
  //   },
  // },
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [VarletUIResolver()],
      }),
      AutoImport({
        resolvers: [VarletUIResolver({ autoImport: true })],
      }),
    ],
  },
})
