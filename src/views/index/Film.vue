<template>
  <div class="home-fulm">
    <van-swipe :autoplay="3000" indicator-color="black" :height="210">
      <van-swipe-item
      v-for="banner in bannerList"
      :key="banner.bannerId"
      ><img :src = "banner.imgUrl" alt="banner"></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('film', [
      'bannerList'
    ])
  },
  methods: {
    ...mapActions('film', [
      'getBannerList'
    ])
  },

  created () {
    this.getBannerList()
  }
}
</script>
<style>
.van-swipe-item img{
  height: 100%;
}
</style>
