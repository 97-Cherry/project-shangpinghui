import { reqAddOrUpdateShopCart, reqGoodsInfo} from "../../API";
import {getUUID} from '../../utils/uuid_token.js'
const state = {
  //根据初始的值来确定当前的是数组还是空对象
  goodInfo: {},
  // 定义一个游客的临时身份,封装为一个函数，只能产生一个值
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
    // console.log(goodInfo)
  }
};
const actions = {
 async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit('GETGOODSINFO',result.data)
    }
  },
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // 加入购物车之后，前台会将参数带给服务器，服务器写入数据成功，并没有返回相应的数据
    // console.log(result);//f返回一个promise对象
    if (result.code == 200) {
       return 'ok'
    }else{
      return Promise.reject(new Error('failure'))
    }
    
  }
};
const getters = {

  //为了简化数据，在getters中进行处理
  categoryView(state) {

    //初始的值是一个{}；所以会出现报错的详细，服务器没有值的时候会存在报错
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },

  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }


};

export default {
  state,
  mutations,
  getters,
  actions
}