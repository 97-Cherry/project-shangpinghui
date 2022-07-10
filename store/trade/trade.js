import {reqAddressInfo,reqTradeList} from '../../API/index.js'
const state = {
  address: [],
  tradelist:{},
};
const mutations = {
  ADDRESSINFO(state, address) {
    return state.address=address
  },
  ORDERINFO(state, tradelist) {
    return state.tradelist=tradelist
  }
};
const actions = {
 async addressInfo({ commit }) {
    let result = await reqAddressInfo();
    // console.log(result);
    if (result.code == 200) {
      commit('ADDRESSINFO', result.data);
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
   
  },
  // 获取商品的清单
  async orderInfo({ commit }) {
    let result = await reqTradeList();
    // console.log(result);
    commit('ORDERINFO',result.data)
}
};
const getters = {
  detailArrayList(state) {
    return state.tradelist.detailArrayList || []
  }
 
};
export default {
  state,
  mutations,
  actions,
  getters
}