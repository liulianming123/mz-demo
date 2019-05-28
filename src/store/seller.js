// 仓库 的商家模块
import axios from 'axios'

export default {
  namespaced: true, // 命名空间

  state: {
    loading: false, // 是否在请求数据
    // finished: false, // 代表数据是否没有更多了
    list: [], // 商家列表

    pageNum: 0,
    pageSize: 10,
    totalSize: 10
  },

  getters: {
    totalPage (state) {
      return Math.ceil(state.totalSize / state.pageSize)
    },

    finished (state, getters) {
      return state.pageNum >= getters.totalPage
    }
  },

  mutations: {
    // state 就是 上面的 state
    addPageNum (state) {
      state.pageNum++
    },

    changeLoading (state, a) {
      state.loading = a
    },

    changeTotalSize (state, num) {
      state.totalSize = num
    },

    changeList (state, list) {
      console.log(list)
      state.list = state.list.concat(list)
      console.log(state.list)
    }
  },

  actions: {
    /**
     * 加载数据
     */
    onLoad ({ commit, state }) {
      setTimeout(() => {
        // this.addPageNum();
        commit('addPageNum')
        axios.get('/json/list.json', {
          params: {
            pageNum: state.pageNum,
            pageSize: state.pageSize
          }
        }).then(res => {
          var data = res.data
          // 前端处理分页
          commit('changeTotalSize', data.length)
          commit('changeList', data.splice((state.pageNum - 1) * state.pageSize, state.pageSize))
          // 数据加载完成之后，需要设置 this.loading = false
          commit('changeLoading', false)
        })
      }, 500)
    }
  }
}
