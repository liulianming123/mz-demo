// 仓库的 cat 模块。仓库的模块就是一个包含有 state getters mutaction actions modules 一个对象

export default {
  namespaced: true, // 命名空间

  state: {
    // 放数据的
    catData: localStorage.getItem('catData') ? JSON.parse(localStorage.getItem('catData')) : [] // 购物车数据
  },

  getters: {
    /**
       * 购物车中商品的数量
       */
    goodCatNums (state) {
      // this.catData 中 num 的总和
      var total = 0
      state.catData.map(item => {
        total += item.num
      })
      return total
    }
  },

  mutations: {
    /**
       * 商品加一
       */
    catAdd (state, good) {
      // 判断当前点击的good是否已经加入了购物车
      var index = state.catData.findIndex(item => item.goodId === good.goodId)
      if (index > -1) {
        // 存在
        state.catData[index].num += 1
      } else {
        // 不存在
        state.catData.push(Object.assign({}, good, { num: 1 }))
      }

      // 将当前的购物车数据存放到本地存储里面。
      localStorage.setItem('catData', JSON.stringify(state.catData))
    },

    /**
       * 商品减一
       */
    catReduce (state, good) {
      // 判断当前点击的good是否已经加入了购物车

      var index = state.catData.findIndex(item => item.goodId === good.goodId)
      if (index > -1) {
        // 存在
        if (state.catData[index].num === 1) {
          // 删除这个商品
          state.catData.splice(index, 1)
        } else {
          // 数量减一
          state.catData[index].num -= 1
        }
      }

      // 将当前的购物车数据存放到本地存储里面。
      localStorage.setItem('catData', JSON.stringify(state.catData))
    },

    deleteList (state, good) {
      var index = state.catData.findIndex(item => item.goodId === good.goodId)
      state.catData.splice(index, 1)
      localStorage.setItem('catData', JSON.stringify(state.catData))
    }
  }
}
