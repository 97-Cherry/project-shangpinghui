// 自定义插件
// vue的差价必须会暴露一个对象，并且会使用install方法
let myPlugins = {};
myPlugins.install = function () {
  // console.log('调用')
}
export default myPlugins