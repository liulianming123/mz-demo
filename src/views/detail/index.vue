<template>
  <div class="detail_main">
      <div class="return_detail">
          <router-link to="/films">👀</router-link>
      </div>
      <div class="detail_img">
          <img :src="deailList.poster">
      </div>

      <div class="detail_title">
          <div class="col">
              <span>{{ deailList.name }}</span><span>{{ deailList.grade }}分</span>
          </div>
          <div class="juqing">剧情</div>
          <div class="times">2019-04-29上映</div>
          <div class="difang">
              <span>{{ deailList.nation }} |</span>
              <span>{{ deailList.runtime }}分钟</span>
          </div>
          <div class="xiangqing">
              <p>
                  {{ deailList.synopsis }}
              </p>
          </div>
      </div>

      <div class="actors">
          <h2>演职人员</h2>
          <ul class="element">
              <li v-for="item in deailList.actors"
              :key="item.name">
                  <img :src="item.avatarAddress">
                  <span>{{ item.name }}</span>
              </li>
          </ul>
      </div>

      <div class="photos">
          <div class="photos_title">
              <span>剧照</span><span>全部</span>
          </div>
          <div class="photoes">
              <ul>
                  <li></li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  data () {
    return {
      deailList: [],
      a: {
        name: 1
      }
    }
  },
  methods: {

    getDetail () {
      console.log(parseInt(this.$route.params.filmId))
      axios.get('https://m.maizuo.com/gateway', {
        params: {
          filmId: parseInt(this.$route.params.filmId),
          k: 8316953
        },
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"15547251162095944040867"}',
          'X-Host': 'mall.film-ticket.film.info'
        }
      }).then(res => {
        if (res.data.status === 0) {
          this.deailList = res.data.data.film
          console.log(res.data)
        } else {
          alert('请求失败')
        }
      })
    }
  },

  created () {
    this.getDetail()
  }
}
</script>

<style>
.return_detail{
    position: fixed;
    height: 30px;
    width: 30px;
    background: #191a1b;
    border-radius: 50%;
    top: 5px;
    left: 5px;
    text-align: center;
    line-height: 30px;

}
.detail_main{
   font-size: 16px;
   background: #797d82;
}
.detail_img{
    height: 211px;
    width: 100%;
}
.detail_img img{
    height: 100%;
    width: 100%;
}
.detail_title{
    height: 189px;
    box-sizing: border-box;
    padding: 12px;
    overflow: hidden;
    background: #ffffff;
    display: flex;
    flex-direction: column;
}
.col{
    height: 26px;
    line-height: 26px;
    display: flex;
    justify-content: space-between;
}
.col span{
    color: #191a1b;
    font-size: 18px;
    height: 26px;
    line-height: 26px;
    margin-right: 7px;
}
/* .col span:nth-child(2){
   margin-right: 180px;
   font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
    display: inline-block;
} */
.col span:nth-child(2){
    margin-right: 12px;
    color: #ffb232;
    text-align: right;
    font-size: 13px
}
.juqing{
        font-size: 13px;
    color: #797d82;
    margin-top: 4px;
}
.times{
        font-size: 13px;
    color: #797d82;
    margin-top: 4px;
}
.difang{
        font-size: 13px;
    color: #797d82;
    margin-top: 4px;
}
.xiangqing{
    overflow: hidden;
            font-size: 13px;
    color: #797d82;
    margin-top: 4px;
}
.xiangqing p{
    height: 40px;
}
.actors{
    margin-top: 12px;
    overflow: hidden;
    background: #ffffff;
}
.actors h2{
    font-size: 16px;
    text-align: left;
    color: #191a1b;
    margin-left: 12px;
}
.actors ul {
    /* height: 130px; */
    width: 100%;
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
}
.actors ul li{
    float: left;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
}
.actors ul li img{
    width: 85px;
    height: 85px;
}
.actors ul li span{
    padding-top: 10px;
    font-size: 12px;
    color: #191a1b;
    width: 85px;
    height: 18px;
    display: block;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.element::-webkit-scrollbar { width: 0 !important }
</style>
