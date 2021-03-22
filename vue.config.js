module.exports = {
  productionSourceMap: false,
  publicPath: '',
  devServer: {
    port: 89,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://119.3.109.19:9091',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}