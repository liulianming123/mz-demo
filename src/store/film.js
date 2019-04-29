// 影片模块
import axios from 'axios'
import { Toast } from 'vant'
const state = {
  bannerList: [], // 电影页面轮播图数据
  filmList: [], // 影片的集合
  filmPageNum: 1, // 影片页码
  filmPageSize: 10, // 影页每页的条数
  filmFlag: false, // 是否在请求影片
  filmTotal: 20 // 影片的总条数
}

const getters = {
  filmPageTotal (state) {
    return Math.ceil(state.filmTotal / state.filmPageSize)
  }
}

const mutations = {
  setBannerList (state, list) {
    state.bannerList = list
  },

  setFilmList (state, list) {
    // state.filmList = list
    // state.filmList.push(...list) 数组追加
    // state.filmList = state.filmList.concat(list)
    state.filmList.push(...list)
  },

  addPageNum (state) {
    state.filmPageNum += 1
  },

  setFilmFlag (state, bol) {
    state.filmFlag = bol
  },

  setFilmTotal (state, num) {
    state.filmTotal = num
  }
}

const actions = {
  /**
   * 获取轮播图数据
   *
   */
  getBannerList ({ commit }) {
    Toast.loading({
      message: '妹子加载中...',
      duration: 0
    })
    axios.get('https://m.maizuo.com/gateway', {
      params: {
        type: 2,
        cityId: 310100,
        k: 5957362
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15547251162095944040867"}',
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      console.log(res.data)
      let result = res.data
      if (result.status === 0) {
        commit('setBannerList', result.data)
      } else {
        Toast('页面请求失败，请刷新') // 提示框
      }
      Toast.clear()
    }).catch(error => {
      Toast.clear()
      Toast(error.message)
    })
  },

  /**
   * 获取当前影片的影片的集合
   */
  getFilmList ({ commit, state }) {
    // Toast.loading({
    //   message: '妹子加载中...',
    //   duration: 0
    // })

    // 发请求之前变为true
    commit('setFilmFlag', true)

    axios.get('https://m.maizuo.com/gateway', {
      params: {
        cityId: 310100,
        pageNum: state.filmPageNum,
        pageSize: state.filmPageSize,
        type: 1,
        k: 9047130
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15547251162095944040867"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
    //   console.log(res.data)
      let result = res.data
      if (result.status === 0) {
        commit('setFilmList', result.data.films)
        commit('setFilmTotal', result.data.total)
      } else {
        Toast('页面请求失败，请刷新') // 提示框
      }
      // 这个请求完成之后，对 filmPageNum 做加一的操作
      commit('addPageNum')

      // 请求完成之后变为false
      commit('setFilmFlag', false)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
