//路由的配置信息
//引出路由插件


// import Search from '../pages/Search/index.vue'
// import Login from '../pages/Login/index.vue'
// import Register from '../pages/Register/index.vue'
// import Detail from '../pages/Detail/index.vue'

// import AddCartSucess from '../pages/AddCartSuccess/index.vue'
// import ShopCart from '../pages/ShopCart/index.vue'
// import Trade from '../pages/Trade//index.vue'
// import Pay from '../pages/Pay/index.vue'
// import PaySuccess from '../pages/PaySuccess/index.vue'
// import Center from '../pages/Center/index.vue'
// //引入二级路由组件内容
// import MyOrder from '../pages/Center/myOrder/index.vue'
// import GroupOrder from '../pages/Center/groupOrder/index.vue'
// 路由懒加载，
// const foo = () => {
//     return import('../pages/Home/index.vue')
// }
//component: import('../pages/Home/index.vue')可以进行路由懒加载的使用 

export default [
    


    { path: '/home', component: ()=>import('../pages/Home/index.vue'), meta: { show: true } },
    { path: '/search/:keyword?', name: 'search', component: ()=>import('../pages/Search/index.vue'), meta: { show: true } },
    { path: '/login', component: ()=>import ('../pages/Login/index.vue'), meta: { show: false } },
    { path: '/register', component: ()=>import ('../pages/Register/index.vue'), meta: { show: false } },
    { path: '/', redirect: '/home' },
    { path: '/detail/:skuid', component:()=> import ('../pages/Detail/index.vue'), meta: { show: false } },
    { path: '/addcartsucess', component: ()=>import ('../pages/AddCartSuccess/index.vue'), name: "addcartsucess", meta: { show: true } },
    { path: '/shopcart', component:()=> import ('../pages/ShopCart/index.vue'), name: "shopcart", meta: { show: true } },
    {
        path: '/trade', component: ()=>import ('../pages/Trade//index.vue'), name: 'trade', meta: { show: true },
        //路由独享守卫，
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next();
            } else {
                // next(false);终端当前的额导航，如果浏览器的地址改变，会回到之前的位置，from的地址
                next(false)
            }
        }
    },
    {
        path: '/pay', component: ()=>import ('../pages/Pay//index.vue'), name: 'pay', meta: { show: true },
        // beforeEnter

        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }

    },
    { path: '/paysuccess', component: ()=>import ('../pages/PaySuccess/index.vue'), name: 'paysuccess', meta: { show: true } },
    {
        path: '/center', component: ()=>import ('../pages/Center/index.vue'), name: 'center', meta: { show: true }, children: [
            { path: 'myorder', component: ()=> import ('../pages/Center/myOrder/index.vue') },
            { path: 'grouporder', component:()=> import ('../pages/Center/groupOrder/index.vue') },
            { path: '/center', redirect: '/center/myorder' }

        ]
    }


]