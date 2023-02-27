import Vue from 'vue'
import Vuex from 'vuex'
import goods from './modules/goods'
import createPersistedstate from 'vuex-persistedstate'
import login from './modules/login'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    goods,
    login,
    menu
  },
  plugins:[
    createPersistedstate({
      key:'goods',
      paths:['goods','login']
    })
  ]
 
})
