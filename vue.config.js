const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath:'./',//部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV == 'production' ? './' : '/',//部署应用包时的基本 URL

  devServer: {
    proxy: {
      '/api': {
        // target:process.env.VUE_APP_BASE_URL,//http://localhost:9898/api
        target: 'http://localhost:9898',//http://localhost:9898/api
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/foo': {
        target: 'http://www.baidu.com'
      }
    }
  }
})
