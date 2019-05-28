<template>
  <div class="my-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      loading-text="拼命中..."
      @load="onLoad"
      :offset="10"
      >
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        is-link
        :to="{ name: 'detail', params: { id: item.id } }"
        >
        <template slot="icon">
          <img :src="item.img" alt="">
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'List',

  data () {
    return {

    }
  },

  computed: {
    ...mapState('seller', [
      'list',
      'pageNum',
      'pageSize',
      'totalSize'
    ]),
    ...mapGetters('seller', [
      'totalPage',
      'finished'
    ]),
    loading: {
      get () {
        return this.$store.state.seller.loading
      },
      set (value) {
        this.$store.commit('seller/changeLoading', value)
      }
    }
  },

  methods: {
    ...mapMutations('seller', [
      'changeList',
      'changeTotalSize',
      'changeLoading',
      'addPageNum'
    ]),
    ...mapActions('seller', [
      'onLoad'
    ])
  }
}
</script>

<style lang="less">
.my-list {
  img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
}

</style>
