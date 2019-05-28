import axios from 'axios'
import { Toast } from 'vant'

const state = {
  banners: [], // 电影轮播
  movieTitle: [],
  cinemaId: 1701,
  filmId: 4611
}

const getters = {
  bannerMap (state) {
    return state.banners.filter(item => {
      if (item.filmId === state.filmId) {
        return item
      }
    })
  }
}

const mutations = {
  setFilmId (state, list) {
    state.filmId = list
  },
  setBannerList (state, list) {
    state.banners = list
  },

  setMovieTitle (state, list) {
    state.movieTitle = list
  },

  setCinemaId (state, list) {
    state.cinemaId = list
    console.log(1111)
  }
}

const actions = {
  getBannerList ({ commit }) {
    // console.log('1')
    axios.get('https://m.maizuo.com/gateway/', {
      params: {
        cinemaId: state.cinemaId,
        k: 8659256
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15547251162095944040867"}',
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
      let result = res.data
      // console.log(result.data.films[0].poster)
      if (result.status === 0) {
        // console.log(1)
        commit('setBannerList', result.data.films)
        // console.log(result.data.cities)
      } else {
        Toast(result.msg)
      }
    })
  },

  getMovieTitle ({ commit, state }) {
    Toast('加载中')
    axios.get('https://m.maizuo.com/gateway/', {
      params: {
        cinemaId: state.cinemaId,
        k: 8638505
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15547251162095944040867"}',
        'X-Host': 'mall.film-ticket.cinema.info'
      }
    }).then(res => {
      let result = res.data
      // console.log(result)
      if (result.status === 0) {
        console.log(2)
        commit('setMovieTitle', result.data.cinema)
        // console.log(result.data.cities)
      } else {
        Toast(result.msg)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
