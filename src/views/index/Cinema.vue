<template>
  <div class="cinema">

    <div class="cinema_top">
      <span class="el-icon-location">
        <a href="#/city" style="font-size:12px;color:red">{{ curCity }}</a>
      </span>
      <span>影院</span>
      <span>
        <a href="#/cinema/search" class="el-icon-search"></a>
      </span>
    </div>

    <div class="cinema_header">
      <div>
        全城
        <van-icon name="arrow-down"/>
      </div>
      <div @click="isShow = !isShow">
        APP订票
        <van-icon name="arrow-down"/>
      </div>
      <div>
        最近去过
        <van-icon name="arrow-down"/>
      </div>
    </div>
      <div class="list_ding" v-if="isShow">
          <ul>
            <li :class="{ active: Show}" @click="Show = true">
              <van-icon name="success"/>APP订票
            </li>
            <li :class="{ active: !Show}" @click="Show = false">
              <van-icon name="success"/>前台兑换
            </li>
          </ul>
        </div>

    <div class="cinema_list">
      <ul>
        <li v-for="item in cinameList.cinemas" :key="item.cinemaId" @click="setCinemaId(item.cinemaId)">

          <router-link :to="'/cinema/' + item.cinemaId + '/film'">
            <div>
              <span style="color:#191a1b">{{ item.name }}</span>
              <span
                style="font-size:12px;width:212px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#797d82"
              >{{ item.address }}</span>
            </div>
            <div>
              {{ item.lowPrice/100 }}
              <i style="color: #ff5f16;font-size: 10px;">起</i>
            </div>
          </router-link>

        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      isShow: false,
      Show: true
    }
  },

  computed: {
    ...mapState('cinema', ['cinameList']),
    ...mapState('city', ['curCity'])
  },

  methods: {
    ...mapActions('cinema', [
      'getCinemaList'
    ]),
    ...mapMutations('movie', [
      'setCinemaId'
    ]),
    fn1 () {
      console.log(222)
    }
  },

  created () {
    this.getCinemaList()
  }
}
</script>

<style>
.cinema {
  font-size: 12px;
}
.cinema_top {
  display: flex;
  height: 44px;
  justify-content: space-between;
  font-size: 16px;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 99;
  background: #fff;
}
.cinema_top span:nth-child(1) {
  margin-left: 15px;
}
.cinema_top span:nth-child(3) {
  margin-right: 15px;
}
.cinema_header {
  height: 50px;
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 44px;
  right: 0px;
  width: 100%;
  z-index: 99;
  background: #fff;
}
.cinema_header div {
  font-size: 14px;
  text-align: center;
  flex: 1;
  height: 100%;
  line-height: 50px;
  position: relative;
}
.list_ding {
  position: fixed;
  background: #fff;
  width: 100%;
  top: 94px;
  right: 0;
}
.list_ding ul {
  width: 100%;
  background: #fff;
}
.list_ding ul li{
  margin-left: 20px;
  height: 44px;
  line-height: 44px;
}
.active{
  color: #ff5f16;
}
.cinema_list {
  overflow-y: auto;
}
.cinema_list ul {
  overflow-y: auto;
  margin-top: 94px;
}
.cinema_list ul li {
  height: 75px;
  box-sizing: border-box;
  padding: 15px;
}
.cinema_list ul li a {
  display: flex;
  justify-content: space-between;
}
.cinema_list ul li a div:nth-child(1) span {
  display: block;
  font-size: 15px;
}
.cinema_list ul li a div:nth-child(2) {
  color: #ff5f16;
  font-size: 15px;
}
</style>
