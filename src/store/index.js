import Vue from 'vue'
import Vuex from 'vuex'
import film from './film'
import phone from './phone'
import cinema from './cinema'
import city from './city'
import movie from './movie'
import seller from './seller'
import cat from './cat'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    film,
    phone,
    cinema,
    city,
    movie,
    seller,
    cat
  }
})
