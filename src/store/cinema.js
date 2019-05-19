import axios from 'axios'

const state = {
  cinameList: [], // 影院列表
  cinameName: [] // 影院名字
}

const getters = {

}

const mutations = {
  setCinameList (state, list) {
    state.cinameList = list
  },
  getCinameName (state, list) {
    state.cinameName = list
  }
}
const actions = {
  getCinemaList ({ commit }) {
    axios.get('https://m.maizuo.com/gateway', {
      params: {
        cityId: 440300,
        ticketFlag: 1,
        k: 5706429
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15547251162095944040867"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      if (res.data.status === 0) {
        console.log(res.data.data)
        commit('setCinameList', res.data.data)
        let str = res.data.data.cinemas
        console.log(str)
        let strs = str.map(item => {
          return item.name
        })
        console.log(strs)
        commit('getCinameName', strs)
      } else {
        alert('请求失败')
      }
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
