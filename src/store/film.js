// 影片模块
import axios from 'axios'
import { Toast } from 'vant'
const state = {
  bannerList: [] // 电影页面轮播图数据
}

const mutations = {
  setBannerList (state, list) {
    state.bannerList = list
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
