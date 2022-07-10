//将每一个小仓库的数据进行单独的设置
//search模块的小仓库
import {reqGetSearchInfo} from "../../API/index.js"
const state = {
  searchList:{}

}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList=searchList
  }
}
const actions = {
  async getSearchList({commit},params={}) {
    //params是当用户派发action的时候，传递过来的一个空对象
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      
      commit('GETSEARCHLIST',result.data)
    }
  }
}
const getters = {
  // getters主要的作用就是简化仓库中的数据
  //getters可以把我们在组件中需要使用的数据进行简化
  goodsList(state) {//
    // console.lof(state);//是当前仓库中的state中的对象
    return state.searchList.goodsList || [];
    //state.searchList.goodsList服务器返回的数据，如果网络不给力，会出现网络数据加载不完全，会出现undefined，至少需要给一个[]的形式
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  }
}
//需要对外暴露
export default {
  state,
  mutations,
  actions,
  getters
}