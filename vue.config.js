module.exports = {
  productionSourceMap: false,
  publicPath: '',
  devServer: {
    port: 89,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://172.16.0.6:9091',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}