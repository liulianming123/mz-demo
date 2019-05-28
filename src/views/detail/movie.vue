<template>

  <div class="list-complete-item">
    <div class="movie_back" @click="$router.back()"> 
        <van-icon name="arrow-left"/>
    </div>
    <div class="movie_title">
      {{ movieTitle.name }}
    </div>
    <div class="movie_tap">
       <div v-for="item in movieTitle.services" :key="item.name">
           {{ item.name }}
       </div>
    </div>
    <div class="movie_site">
      <van-icon name="location-o" style="margin-left:10px"/>
      <span>{{ movieTitle.address }}</span>
      <van-icon name="phone-o" style="margin-right:15px"/>
    </div>

   <div class="movie_banner">
    <div class="swiper-container">
      <div class="swiper-wrapper">

    <div class="swiper-slide" style="background-image:url(img/nature1.jpg)"
       v-for="( item ) in banners"
        :key="item.poster"
        ><img :src="item.poster" style="width:100%;height:100%" @click="setFilmId(item.filmId)">
    </div>

      </div>
      <!-- Add Pagination -->
    </div>
       <div class="trilateral">▲</div>
    </div>

    <div class="movie_name" @click="fn2(bannerMap[0].filmId)">
        <div>
            <h1>{{ bannerMap[0].name }}</h1>
        <span>{{ bannerMap[0].grade }}分</span>
        </div>
        <div>
            {{ bannerMap[0].category }}|{{ bannerMap[0].runtime }}分钟|{{bannerMap[0].director}}
        </div>
    </div>
=

    <div class="movie_tabs">
        <ul>
            <!-- <li>今天520</li>
            <li>今天520</li>
            <li>今天520</li> -->
        </ul>
    </div>
    <div class="movie_sale">
        <div class="movie_sale_list">
            <div class="">
                <span>08:40</span>
                <span>10:24散场</span>
            </div>
            <div class="">
                <span>
                    原版3D
                </span>
                <span>
                    2号激光厅
                </span>
            </div>
            <div class="">
                <span>￥35</span>
            </div>
        </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {

    }
  },

  computed: {
    ...mapState('movie', [
      'banners',
      'movieTitle'
    ]),
    ...mapGetters('movie', [
      'bannerMap'
    ])
  },

  methods: {
    bannerList () {
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }
      })
    },

    ...mapActions('movie', [
      'getBannerList',
      'getMovieTitle'
    ]),

    ...mapMutations('movie', [
      'setFilmId'
    ]),

    fn2 (id) {
      console.log(2)
      this.$router.push({ name: 'filmDetail', params: { filmId: id } })
    }

  },
  created () {
    setTimeout(this.getBannerList, 500)
    setTimeout(this.getMovieTitle, 500)
  },

  mounted () {
    //  this.bannerList()
    setTimeout(this.bannerList, 1000)
  }
}
</script>

<style>
    .swiper-container {
        width: 100%;
    }
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 90px;
        height: 130px;

    }
.movie_banner{
    height: 160px;
    box-sizing: border-box;
    padding: 15px 0;
    background: url("../../assets/banner.jpg") no-repeat;
}
.movie_back{
    height: 44px;
    font-size: 26px;
    line-height: 44px;
    padding-left: 10px;
    position: fixed;
    top: 0;
    left: 0;
}
.movie_title{
    height: 44px;
    text-align: center;
    font-size: 17px;
    color: #191a1b;
    line-height: 44px;
    position: relative;
    margin-top: 44px;
}
.movie_tap{
    height: 34px;
    text-align: center;
    padding-left: 100px;
}
.movie_tap div{
    text-align: center;
    height: 14px;
    font-size: 10px;
    border: 1px solid #ffb232;
    float: left;
    padding: 2px;
    margin-left: 5px;
    color: #ffb232;
}
.movie_site{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    height: 50px;
    position: relative;
}
.movie_site span{
    width: 280px;
    font-size: 14px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.trilateral{
    position: absolute;
    left: 50%;
    font-size: 14px;
    color: #fff;
    margin-left: -7px;
}
.movie_name{
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.movie_name div:nth-child(1){
    display: flex;
    align-items: center;
    justify-content: center;

}
.movie_name div:nth-child(1) h1{
      font-size: 15px;
    color: #191a1b;
    height: 18px;
}
.movie_name div:nth-child(1) span{
        font-size: 16px;
    font-style: italic;
    color: #ffb232;
}
.movie_name div:nth-child(2){
    display: flex;
    align-items: center;
    justify-content: center;
    height: 18px;
}
.movie_tabs{
    height: 50px;
}
.movie_tabs ul{
  height: 50px;
}
.movie_tabs li{
    float: left;
    line-height: 50px;
    padding: 0 15px;
}

</style>
