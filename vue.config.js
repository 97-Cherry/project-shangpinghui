module.exports = {
  // 项目打包的过程中不在需要.map文件
  productionSourceMap:false,
  //关闭eslint校验功能
  lintOnSave: false,
  //webpack官方文档实现跨域问题的解决
  devServer: {
    proxy: {
      '/api': {
        target: ' http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
  
}
