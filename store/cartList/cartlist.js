import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "../../API";
const state = {
  cartList:[]
};
const mutations = {
  GETCARTLIST(state,cartList) {
    return state.cartList=cartList
    
  }
};
const actions = {
  //获取购物车列表的数据
 async getCartList({ commit }) {
    let result = await reqCartList();
    // console.log(result);
    if (result.code == 200) {
      commit('GETCARTLIST',result.data)
    }
  },
  // 删除购物车列表中的数据
  async deleteCartById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    // console.log(result)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
  },
  // 修改商品列表中的数据
 async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result=await reqUpdateCheckedById(skuId,isChecked)
   if (result.code == 200) {
      return 'ok'
   } else {
     return Promise.reject(new Error('failure'))
    }
  },
//  用来删除商品中的某一个值
 deleteAllCheckedCart({dispatch,getters}) {
  //  console.log(content)
   let PromiseAll=[]
   getters.cartList.cartInfoList.forEach(item => {
    let promise= item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : ''
     PromiseAll.push(promise)
   })
   return Promise.all(PromiseAll)
  },
//  修改全部商品的选中状态
  updataChangeAllChecked({ dispatch, state }, isChecked) {
    // console.log(state);
    // console.log(isChecked);
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      // item.isChecked==0?dispatch('')
      
      let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
      promiseAll.push(promise)
    
    });
    return Promise.all(promiseAll)
  } 
  

};
const getters = {
  cartList(state) {
    return state.cartList[0] || []
  },
  // 计算属性值，来获取cartList中的cartInfoList
  // cartInfoList(state) {
  //   return state.cartList.cartInfoList || []
    
  // }

};
export default {
  state,
  mutations,
  actions,
  getters
}
