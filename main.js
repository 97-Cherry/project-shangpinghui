import Vue from 'vue'
import App from './App.vue'
//导入配置的路由组件
import router from './router/router.js'

//用来引入仓库
import store from './store/index.js'
import b1 from '../src/assets/logo.png'
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  // 懒加载默认的图片,v-lazy进行加载调用
   loading:b1
  //在进行加载过程中会显示的内容
});//vue.use();调用了install方法

// 注册为一个三级联动的全局组件
import TypeNav from './components/TypeNav/index.vue'
import { Button ,MessageBox} from 'element-ui'


//导入模拟的mock数据
import './mock/mockServe.js'

// 引入swiper的样式
import 'swiper/css/swiper.css'
//引入icon图标的样式
import './assets/iconfont/iconfont.css'
import pagination  from './components/Pagination/index.vue'
// import '../src/icon/iconfont.css'
//Vue.component()其中的第一个参数是TypeNav/index.vue组件的中的name属性对应的名字，TypeNav是使用当前逐渐的一个名字
Vue.component(TypeNav.name, TypeNav);
Vue.component(pagination.name, pagination);


// element-ui组件的使用，全局组件注册
Vue.component(Button.name, Button);
//element-ui可以用来挂载在原型上的一种写法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 在没有vuex存储数据点额情况下，在main.js中引入数据，在全部组件中进行挂载和使用
// 统一引入api中的额接口
import * as API from './API/index.js'

// console.log(API)
  
  
//测试接口数据
// import { reqCategoryList } from './API/index.js'
// reqCategoryList();
Vue.config.productionTip = false



//引入自定义插件

// import myPlugins from './plugins/myPlugins'
// Vue.use(myPlugins)


// 引入表单插件
import './plugins/validate.js'

new Vue({
  render: h => h(App),

  //全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 所有的api接口挂载到原型链上
    Vue.prototype.$API = API;
},

  //注册路由组件
  router,
  store
}).$mount('#app')
