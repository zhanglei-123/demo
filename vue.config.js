module.exports = {
  devServer: {
    port: 89,
    proxy: {
      '/api': {
        target: 'http://192.168.1.150:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}