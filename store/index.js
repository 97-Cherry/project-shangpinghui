import Vue from 'vue'
import Vuex from 'vuex'

//需要使用插件一次
Vue.use(Vuex);

//引入小仓库
import home from './home/index.js'
import search from './search/index.js'
import detail from './detail/index.js'
import cartlist from './cartList/cartlist.js'
import usercode from './code/user.js'
import trade from './trade/trade.js'

//向外暴露一个store类的一个实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    cartlist,
    usercode,
    trade
  }
})