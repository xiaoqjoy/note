import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'   //提交mutations的

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})