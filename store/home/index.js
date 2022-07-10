//将每一个小仓库的数据进行单独的设置
import {reqCategoryList, reqFloorList, reqGetBannerList} from '../../API'
//home模块的小仓库
const state = {
  //会根据解救的返回值进行设置，返回的数据是一个数组就设置为一个数组
  categoryList: [],
  getBannerList: [],
  getFloorList:[]
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList=categoryList
  },
  GETBANNERLIST(state, getBannerList) {
    state.getBannerList=getBannerList
  },
  GETFLOORLIST(state, getFloorList) {
    state.getFloorList = getFloorList;
  }

}
const actions = {
  //通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
   async categoryList({commit}) {
    let result = await reqCategoryList();
    // console.log(result)
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data) 
    }

  },

  //获取首页轮播图的数据
  async getBannerList({commit}) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit('GETBANNERLIST',result.data)
    }
  },
  //获取floor中的数据
  async getFloorList({commit}) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit('GETFLOORLIST',result.data)
    }
  }
}
const getters = {}
//需要对外暴露
export default {
  state,
  mutations,
  actions,
  getters
}