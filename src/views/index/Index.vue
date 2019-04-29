<template>
  <div class="main index">
    <router-view></router-view>
    <!-- Tabbar -->
    <van-tabbar class="my-tabbar" v-model="active">
      <van-tabbar-item icon="home-o" to="{name: 'films, params: { filmType:'nowPlaying' }}">电影</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" to="/cinema">影院</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to="/sale">特惠</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to="/center">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    let active = this.$route.meta.tabNumber
    return {
      active: active
    }
  }
}
</script>
