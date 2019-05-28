<template>
  <div id="aaa">
    <div class="main city-list">
     <van-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="$router.back()"
/>

      <div class="lv-indexlist">
        <ul class="lv-indexlist__content" id="lv-indexlist__content">
          <div class="recommend-city">
            <div class="gprs-city">
              <div class="city-index-title">GPS定位你所在城市</div>
              <ul class="city-index-detail">
                <li class="city-item-detail city-item-detail-gprs">
                  <div class="city-item-text">定位失败</div>
                </li>
              </ul>
            </div>
            <div class="hot-city">
              <div class="city-index-title">热门城市</div>
              <ul class="city-index-detail">
                <li class="city-item-detail"
                v-for="item in hotCity"
                :key="item.cityId"
                @click="chgCurCity(item.name)">
                  <div class="city-item-text">{{ item.name }}</div>
                </li>
                <!-- <li class="city-item-detail">
                  <div class="city-item-text">天津</div>
                </li> -->
              </ul>
            </div>
          </div>
          <li class="lv-indexsection"
          v-for="item in newCityList"
          :key="item.name"
          :id="'box-'+ item.name"
          :ref="'box-'+item.name"
          >
            <p class="lv-indexsection__index">{{ item.name }}</p>
            <ul>
              <li v-for="city in item.citys"
              :key="city.cityId"
              @click="fn2(city.name,city.cityId)"
              >{{ city.name }}</li>
            </ul>
          </li>
        </ul>
        <div class="lv-indexlist__nav">
          <ul>
            <li v-for="py in pys"
            :key="py"
            @click="fn1(py)"
            >{{ py }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'city',
  computed: {
    ...mapState('city', [
      'cityList'
    ]),

    ...mapGetters('city', [
      'newCityList',
      'pys',
      'hotCity'
    ])
  },

  methods: {
    ...mapActions('city', [
      'getCityList'
    ]),
    fn1 (py) {
      console.log(py)
      // let boxEl = document.getElementById('box-' + py)
      // let top = boxEl.offsetTop

      // document.getElementById('lv-indexlist__content').scrollTop = top

      // 除了id还可以使用ref特性来定义元素的标记，后续使用￥refs 这个实例属性去获取她
      let boxEl = this.$refs['box-' + py][0]
      console.log(boxEl)
      let top = boxEl.offsetTop

      document.getElementById('lv-indexlist__content').scrollTop = top
    },

    ...mapMutations('city', [
      'chgCurCity'
    ]),
    ...mapMutations('cinema', [
      'getcityId'
    ]),
    // 切换选择城市
    fn2 (city, cityId) {
      this.chgCurCity(city)
      this.$router.push({path:'film'})
      this.getcityId(cityId)
    }
  },

  created () {
    this.getCityList()
  }
}
</script>

<style lang="less">
@import ".../../../../style/common/mixins.less";

.city-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  .lv-indexlist {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    background: #fff;
    overflow: hidden;
    position: relative;
    &__content {
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
    &__nav {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 100%;

      li {
        height: 18px;
        font-size: 12px;
        color: #191a1b;
        padding: 0 6px;
      }
    }

    .lv-indexsection {
      &__index {
        background-color: #f4f4f4;
        color: #797d82;
        padding-left: 15px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 15px;
        margin-bottom: -1px;
        li {
          .border-1-bottom;
          position: relative;
          width: 33.33%;
          height: 48px;
          line-height: 48px;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 12px;
        }
      }
    }

    .recommend-city {
      padding-left: 15px;
      padding-top: 15px;

      .city-index-title {
        font-size: 13px;
        color: #797d82;
        margin-bottom: 10px;
      }

      .city-index-detail {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .city-item-detail {
          width: 33.33%;
          text-align: center;
          padding-bottom: 15px;
          box-sizing: border-box;
          float: left;

          .city-item-text {
            height: 30px;
            line-height: 30px;
            background-color: #f4f4f4;
            border-radius: 3px;
            box-sizing: border-box;
            margin: 0 7.5px;
            font-size: 14px;
            color: #191a1b;
          }
        }
      }
    }
  }
}
</style>
