<template>
  <div class="cinema">
    <div class="cinema_top">
      <span class="el-icon-location"></span>
      <span>影院</span>
      <span >
        <a href="#/cinema/search" class="el-icon-search"></a>
      </span>
    </div>

    <div class="cinema_header">
       <div>全城<van-icon name="arrow-down"/></div>
       <div>APP订票<van-icon name="arrow-down" /></div>
       <div>最近去过<van-icon name="arrow-down" /></div>
    </div>

    <div class="cinema_list">
      <ul>
        <li v-for="item in cinameList.cinemas"
        :key="item.cinemaId">
          <a href="#">
            <div>
              <span>{{ item.name }}</span>
              <span style="font-size:12px;width:212px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden">{{ item.address }}</span>
            </div>
            <div>{{ item.lowPrice/100 }}<i style="color: #ff5f16;font-size: 10px;">起</i></div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  // data() {

  // },
  computed: {
    ...mapState('cinema', [
      'cinameList'
    ])
  },

  methods: {
    ...mapActions('cinema', [
      'getCinemaList'
    ])
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
  background:#fff;
}
.cinema_top span:nth-child(1) {
  margin-left: 15px;
}
.cinema_top span:nth-child(3) {
  margin-right: 15px;
}
.cinema_header{
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
.cinema_header div{
  font-size: 14px;
  text-align: center;
  flex: 1;
  height: 100%;
  line-height: 50px;
}
.cinema_list{
  overflow-y: auto;
}
.cinema_list ul{
  overflow-y: auto;
  margin-top: 94px;
}
.cinema_list ul li{
  height: 75px;
  box-sizing: border-box;
  padding: 15px;
}
.cinema_list ul li a{
  display: flex;
  justify-content: space-between;
}
.cinema_list ul li a div:nth-child(1) span{
  display: block;
  font-size: 15px;
}
.cinema_list ul li a div:nth-child(2){
  color: #ff5f16;
  font-size: 15px;
}

</style>
