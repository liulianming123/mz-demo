import axios from 'axios'
import { Toast } from 'vant'
// import router from '../router'

const state = {
  brandList: [],
  productList: [],
  curBrandId: -1
}

const getters = {

}

const mutations = {
  setBrandList (state, list) {
    state.brandList = list
  },
  setProductList (state, list) {
    state.productList = list
  },
  setcurBrandId (state, id) {
    state.curBrandId = id
  }
}

const actions = {
  getBrandList ({ commit }) {
    axios.get('/json/brand.json').then(res => {
      let result = res.data
      console.log(result)
      if (parseInt(result._errCode) === 0) {
        commit('setBrandList', result._data.brandList)
      } else {
        Toast(result._errStr)
      }
    })
  },

  getProductList ({ commit, state }) {
    axios.get('/json/product.json', {
      params: {
        brandId: state.curBrandId
      }
    }).then(res => {
      let result = res.data
      // 根据自身的curBrandId去过滤
      let list = result.filter(item => {
        return parseInt(item.brandId) === state.curBrandId
      })
      commit('setProductList', list)
    })
  },
  // 切换品牌 change
  change ({ commit, dispatch }, id) {
    commit('setcurBrandId', parseInt(id))
    dispatch('getProductList') // 调用action中别的方法
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
