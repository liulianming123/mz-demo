<template>
  <div class="film-list-content">
    <div class="nowPlayingList-wrap">
      <ul>
        <li class="item"
        v-for="item in Comming"
        :key="item.filmId">
          <a href="#/film/4480">
            <div class="img">
              <img
                :src="item.poster"
                alt
              >
            </div>
            <div class="info">
              <div class="film-name info-col">
                <span class="name">{{ item.name }}</span>
                <span class="item">{{ item.timeType }}D</span>
              </div>
              <div class="film-grade info-col" style="visibility: visible;">
                <span class="label">观众评分</span>
                <span class="grade">{{ item.grade }}</span>
              </div>
              <div class="film-actors info-col">
                <!-- <span class="label">主演：{{ getActors(item.actors) }}</span> -->
                <span class="label">主演：{{ item.actors | formatActors }}</span>
              </div>
              <div class="film-detail info-col">
                <span class="label">{{ item.nation }} | {{ item.runtime }}分钟</span>
              </div>
            </div>
            <div class="buy" v-if="item.isPresale">预购</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {

  data () {
    return {
      Comming: []    
    }
  },

//   computed: {
//     ...mapState('film', [
//       'filmList'
//     ])
//   },

  methods: {
    getComming () {
      axios.get('https://m.maizuo.com/gateway', {
      params: {
        cityId: 310100,
        pageNum: 1,
        pageSize: 10,
        type: 2,
        k: 9047130
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15547251162095944040867"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data)
      this.Comming = res.data.data.films
    //   if (result.status === 0) {
    //   } else {
    //     Toast('页面请求失败，请刷新') // 提示框
    //   }
    })  
    }
    // ...mapActions('film', [
    //     'getFilmList'
    // ]),

    // 将主演横着排
    // getActors (actors) {
    //   let str = ''
    //   actors.forEach(item => {
    //     str += item.name
    //   })
    //   return str  
    // }
  },

  filters: {
    // 格式化显示主演信息
    formatActors (value = []) {
      let tmp = []
      tmp = value.map(item => item.name)
      return tmp.join('、')
    }
  },

  created () {
    this.getComming()
  }
}
</script>


<style lang="less">
@import '../style/common/mixins.less';

.film-list-content {
  ul {
    margin-left: 15px;

    li {
      .border-1-bottom;
      padding: 15px 15px 15px 0;
      height: 94px;
      position: relative;
      box-sizing: content-box;

      > a {
        display: flex;
        align-items: center;
      }

      .img {
        flex-shrink: 0;
        width: 66px;
        height: 94px;
        background: rgb(249, 249, 249);
        img {
          width: 100%;
          border-radius: 2px;
        }
      }

      .info {
        flex: 1;
        padding: 0 10px;
        overflow: hidden;

        .info-col {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }

        .film-name {
          .name {
            max-width: calc(100% - 25px);
            color: #191a1b;
            font-size: 16px;
            height: 22px;
            line-height: 22px;
            margin-right: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item {
            font-size: 9px;
            color: #fff;
            background-color: #d2d6dc;
            height: 14px;
            line-height: 14px;
            padding: 0 2px;
            border-radius: 2px;
          }
        }

        .film-grade {
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
          .grade {
            color: #ffb232;
            font-size: 14px;
          }
        }

        .film-actors {
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
        }

        .film-detail {
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
        }
      }

      .buy {
        .border-1;
        flex-shrink: 0;
        line-height: 25px;
        height: 25px;
        width: 50px;
        color: #ff5f16;
        font-size: 13px;
        text-align: center;
        border-radius: 2px;
        position: relative;
      }
    }
  }
}
</style>
