import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  getters: {
    isLogin(state) {
      return !!Object.keys(state.userInfo).length;
    }
  },
  actions: {
  },
  mutations: {
    changeUserInfo(state, data) {
      state.userInfo = data;
    }
  }
})
