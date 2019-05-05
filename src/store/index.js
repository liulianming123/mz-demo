import Vue from 'vue'
import Vuex from 'vuex'
import film from './film'
import phone from './phone'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    film,
    phone
  }
})
