<template>
  <div class="home-fulm">

    <van-swipe :autoplay="3000" indicator-color="black" :height="210">
      <van-swipe-item v-for="banner in bannerList" :key="banner.bannerId">
        <img :src="banner.imgUrl" alt="banner">
      </van-swipe-item>
    </van-swipe>

    <van-tabs class="mz-tabs" :class="{ 'fixed':tabFixed }" v-model="curTab" @click="onTabClick" sticky>
      <van-tab title="正在热映">
        <NowPlaying></NowPlaying>
      </van-tab>
      <van-tab title="即将上映">
        <ComingSoon></ComingSoon>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import NowPlaying from '../../components/NowPlaying.vue'
import { setInterval } from 'timers'
import ComingSoon from '../../components/ComingSoon.vue'
export default {

  components: {
    NowPlaying,
    ComingSoon
  },

  data () {
    let curTab = this.$route.params.filmType === 'nowPlaying' ? 0 : 1
    return {
      curTab: curTab,
      tabFixed: false, // 是否吸顶
      timer: null // 定时器的值
    }
  },

  computed: {
    ...mapState ('film', [
      'bannerList',
      'filmFlag'
    ])
  },

  methods: {
    ...mapActions ('film', [
      'getBannerList',
      'getFilmList'
    ]),

    // tab点击的时候触发
    onTabClick (index, title) {
      let filmType = index === 0 ? 'nowPlaying' : 'comingSoon'
      this.$router.replace({
        name: 'films',
        params: {
          filmType: filmType
        }
      })
    },

    // 滚动条的事件函数
    onScroll () {
      // console.log(1)
      let top = document.documentElement.scrollTop
      let clientHeight = document.documentElement.clientHeight
      let bodyHeight = document.body.offsetHeight
      if (top >= 210) {
        // 吸顶
        this.tabFixed = true
      } else {
        this.tabFixed = false
      }

      // 公式 可视区的高度 + 滚动条距离顶部的高度 === 页面的高度 触底了
      if(clientHeight + top >= (bodyHeight - 20) ){
        //到底了，再次加载请求getfilmList，请求下一页
        // 定一个 flag false时发请求， true时不发
        if(!this.filmFlag){
          this.getFilmList()
        }
      }
    }
  },

  created () {
    this.getBannerList()
    this.getFilmList()
  },

  mounted () {
    window.addEventListener('scroll', this.onScroll)

    // this.timer = setInterval(() => {
    //   // console.log(6)
    // }, 2000)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
    // clearInterval(this.timer)
  }
}
</script>
<style lang="less">
.van-swipe-item img {
  height: 100%;
}
.mz-tabs {
  &.fixed {
    .van-tabs_wrap {
      position: fixed;
    }
  }
}
</style>
