//用来配置路由的地方

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './index.js'
// 获取仓库中组件中的数据内容
import store from '../store/index.js'
//先把原型VueRouter原型对象的push先保存一份
let orginPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;

//重写push/replace
//第一个参数需要告诉我们需要将参数往哪里传递
//apply和call都可以用来传递参数，但是当前传递参数的额方式是不同的，call传递参数是需要逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    orginPush.call(this, location,resolve,reject)
  } else {
    orginPush.call(this,location,()=>{},()=>{})
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    orginReplace.call(this,location,resolve,reject)
  } else {
    orginReplace.call(this,location,()=>{},()=>{})
  }
}

//使用插件
Vue.use(VueRouter);
//

let router = new VueRouter({
  //配置路由的内容
  mode: 'history',
  routes,
  // 滚动行为，0表示滚动条
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    // 在每一次进入页面的时候，默认页面的展示是从头部开始展示，不会默认为是之前浏览器浏览下的位置处停留
    return { y: 0 }
  },
  
});

// 导航全局守卫，在路由进行跳转之前进行判断
router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
// to获取到要跳转的路由信息
  // from获取到要从哪个路由进行跳转过来的信息
  // next :next()表示放行
  //获取仓库中的token值，可以用来确定当前的用户是否登录，进行登录之后，数据刷新就不在实现
  next();
  // console.log(store)
  let token = store.state.usercode.token;
  let name=store.state.usercode.userInfo.name
  // console.log(name);
 if (token) {
    // 用户登录,
    // 表示用户已经登录，并想要再次登录和注册，会表示不放行
    if (to.path == '/login' || to.path == '/register') {
      next('/');//表示不能放行
    } else { 
      // 表示用户正要去登录，访问的是非登录页面
      if (name) {
        next();//登录了之后，存在用户信息
      }
      else {
        try {
          //登录之后，没有用户信息，在跳转之前，获取用户信息
        await store.dispatch('getUserInfo')
          next();

        } catch (error) {
          // token失效，

          await store.dispatch('userLogOut');
          next('/login')
        }
        
     }
    }
  } else {
    // 用户未登录,不能去添加到购物车，支付和订单详情页面中存在的内容不能直接进行跳转
   //在交易页面，支付页面，个人中心等页面，未登录，去登录页面

   let topath = to.path;
  //  console.log(topath);
   if (topath.indexOf('/trade') != -1 || topath.indexOf('/pay') != -1 || topath.indexOf('/center') !=-1) {
    //  把未登录的时候，想去的信息，存储到地址栏中，存在query参数，带query参数的内容中进行跳转
     next('/login?redirect=' + topath)
   } else {
     next();
   }
    
  }

})
export default router