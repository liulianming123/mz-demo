import axios from 'axios'
import { Toast } from 'vant'

const state = {
  cityList: [],
  curCity: localStorage.getItem('curCity') || '未选择' // 当前选择的城市
}

const getters = {
  newCityList (state) {
    let flag = {}
    let index = 0
    let result = []
    let list = state.cityList
    list.forEach(item => {
      // 1.得到当前首字母拼音
      let py = item.pinyin.substr(0, 1).toUpperCase()
      if (flag[py]) {
        result[flag[py] - 1].citys.push(item)
      } else {
        flag[py] = ++index
        let obj = {
          name: py,
          citys: [item]
        }
        result.push(obj)
      }
    })
    result = result.sort((a, b) => {
      return a.name.charCodeAt() - b.name.charCodeAt()
    })
    return result
  },

  pys (state, getters) {
    return getters.newCityList.map(item => {
      return item.name
    })
  },

  hotCity (state) {
    return state.cityList.filter(item => {
      return item.isHot
    })
  }
}

const mutations = {
  setCityList (state, list) {
    state.cityList = list
  },

  chgCurCity (state, city) {
    // 1.将数据保存到localStorage
    localStorage.setItem('curCity', city)

    // 2.修改城市
    state.curCity = city
  }
}

const actions = {
  getCityList ({ commit }) {
    // console.log('1')
    axios.get('https://m.maizuo.com/gateway?k=2653034', {
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15547251162095944040867"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      let result = res.data
      // console.log(result)
      if (result.status === 0) {
        commit('setCityList', result.data.cities)
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
