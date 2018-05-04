import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import LocalStorage from './localStorage'
Vue.use(Vuex)

let localstorage = new LocalStorage()
let loginuser = localstorage.getItem('login')
let storeinfo = localstorage.getItem('storeinfo')
let walletinfo = localstorage.getItem('wallentinfo')
// 创建基本状态
const state = {
  Logined: loginuser || {},
  Store: storeinfo || {},
  Wallet: walletinfo || {}
}
console.log(state.Logined.token)
Axios.defaults.headers.common['X-Access-Token'] = state.Logined.token
// 创建改变状态的方法
const mutations = {
  // 登录功能
  LOGIN (state, userInfo) {
    state.Logined = userInfo
    localstorage.setItem('login', state.Logined)
    Axios.defaults.headers.common['X-Access-Token'] = state.Logined.token
  },
  LOGOUT (state) {
    localstorage.clearItem('login')
  },
  // 店铺注册录入信息
  STOREINFO  (state, storeinfo) {
    state.Store = storeinfo
    localstorage.setItem('storeinfo', state.Logined)
  },
  // 福袋相关信息
  WALLETINFO  (state, walletinfo) {
    state.Wallet = walletinfo
    localstorage.setItem('wallentinfo', state.Wallet)
  }
}

// 创建驱动actions可以使得mutations得以启动
const actions = {
  login ({commit}, userInfo) {
    commit('LOGIN', userInfo)
  },
  logout ({commit}) {
    commit('LOGOUT')
  },
  storeinfochange ({commit}, info) {
    commit('STOREINFO', info)
  },
  walletinfochange ({commit}, info) {
    commit('WALLETINFO', info)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
