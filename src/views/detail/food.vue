<template>
  <div class="my-detail">
    <van-nav-bar
      :title="info.name"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-card
      v-for="item in info.goods"
      :key="item.id"
      :price="item.price"
      desc="描述信息"
      :title="item.name"
      :thumb="item.img"
      >
      <div slot="footer">
        <van-button size="mini" @click="catReduce(item)">-</van-button>
        <span>{{ showNum(item.goodId) }}</span>
        <van-button size="mini" @click="catAdd(item)">+</van-button>
      </div>
    </van-card>

    <van-goods-action class="bottom">
      <van-goods-action-mini-btn
        v-if="goodCatNums"
        icon="cart-o"
        text="购物车"
        :info="goodCatNums"
        @click="show = !show"
      />
      <van-goods-action-mini-btn
        v-else
        icon="cart-o"
        text="购物车"
        @click="show = !show"
      />
      <van-goods-action-big-btn
        primary
        text="立即购买"
        @click="toCat"
      />
    </van-goods-action>

    <van-popup
      v-model="show"
      position="bottom"
      >
      <ul class="hello">
        <li
          v-for="good in catData"
          :key="good.goodId">
          {{ good.name }}

          数量为：{{ good.num }}
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { NavBar,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
  , Popup, Button, Card } from 'vant'

Vue
  .use(GoodsAction)
  .use(GoodsActionBigBtn)
  .use(GoodsActionMiniBtn)

Vue.use(Button)

Vue.use(Popup)

Vue.use(NavBar)

Vue.use(Card)
export default {
  name: 'Detail',

  data () {
    return {
      info: {},
      show: false

      // catData: [],  // 购物车数据
    }
  },

  computed: {
    ...mapState(
      ['name', 'msg', 'age']
    ),
    ...mapState('cat', [
      'catData'
    ]),
    ...mapGetters('cat', [
      'goodCatNums' // 购物车商品数量 this.catDate 中 num 的总和
    ])
  },

  methods: {
    ...mapMutations([
      'changeName',
      'chagneMsg',
      'chagneAge'

    ]),
    ...mapMutations('cat', [
      'catAdd',
      'catReduce'
    ]),
    onClickLeft () {
      this.$router.back()
    },

    getDetailData () {
      axios.get('/json/list.json', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        let data = res.data
        this.info = data.find(item => {
          return item.id === parseInt(this.$route.params.id)
        })
      })
    },

    /**
     * 在商品上面显示加入到购物车中数量
     */
    showNum (goodId) {
      var data = null
      data = this.$store.state.cat.catData.find(item => item.goodId === goodId)
      return data ? data.num : ''
    },

    toCat () {
      this.$router.push({ path: '/cat' })
    }
  },

  created () {
    // console.log(this.$store)
    this.getDetailData()
  }
}
</script>

<style lang="less">
.cat-btn {
  position: absolute;
  right: 20px;
  bottom: 50px;
  font-size: 40px;
}

.hello {
  padding-bottom: 50px;
}

.bottom {
  z-index: 99999;
}
</style>
