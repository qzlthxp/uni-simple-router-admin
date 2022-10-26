import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import route from './modules/route'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    route
  },
  getters
})

export default store
