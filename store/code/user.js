// 登录和注册的模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut} from '../../API/index.js'
import { setToken } from '../../utils/token.js';
import { getToken,removeToken } from '../../utils/token.js';
const state = {
  code: '',
  token: getToken(),
  userInfo:{}
};
const mutations = {
  GETCODE(state,code) {
    return state.code=code
    // console.log(state,code)
  },
  USERLOGIN(state, token) {
    return state.token=token
  },
  GETUSERINFO(state, userInfo) {
    return state.userInfo=userInfo
    
  },
  // 清除本地的数据
  CLEAL(state) {
    state.token = '';
    state.userInfo = {};
    removeToken()

    
  }
};
const actions = {
  async getCode({ commit }, phone) {
    // 获取验证码的接口，通过后台将验证码返回到用户端额收集上
    let result = await reqGetCode(phone);
    // console.log(result)
    if (result.code == 200) {
      commit("GETCODE", result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
  },
  // 用户注册的内容
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    console.log(result)
    if (result.code == 200) {
      
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
  },
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    // console.log(result);
    //浏览器中通常带有的token是用户唯一的标识
    if (result.code == 200) {
      // 拿到用户唯一的uuid中token的唯一标识
      commit('USERLOGIN', result.data.token);
      // 持久化存储token的值
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    // console.log(result);
    if (result.code == 200) {
      commit('GETUSERINFO', result.data);
      // getToken(result.data.token)
      // return 'ok'
    }
    // else {
    //   return Promise.reject(new Error('failure'))
    // }

  },
  //退出登录的用户信息
  async userLogOut({ commit }) {
    let result =await reqLogOut();
    // console.log(result)
    if (result.code == 200) {
      commit('CLEAL');
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}