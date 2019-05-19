<template>
  <div>
    <div class="search_top">
      <van-search
        v-model="search"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @keyup="seachup()"
      >
        <div slot="action" @click="onSearch">取消</div>
      </van-search>
    </div>
    <div v-for="(item,index) in list" :key="index" style="font-size:12px">
      {{ item }}
    </div>
    <!-- <buutton @click="fn1">aaa</buutton> -->
    <div v-if="isshow" style="height:320px;width:100%">
      <img src="../../assets/no.png" style="height:100%;width:100%">
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      search: '',
      listr: [],
      list: [],
      isshow: false
    }
  },

  computed: {
    ...mapState('cinema', ['cinameName'])
    // getlists(){
    //   this.list.push(this.search)
    // }
  },

  methods: {
    onSearch () {
      this.$router.push({ name: 'cinemas' })
    },
    // fn1() {
    //   this.names = "";
    // },
    // getlists(){
    //   // this.list.push(this.search)
    // },
    seachup () {
      //   alert(1)
      // var str = {
      //   //第二步：定义输入框的数据保存给str
      //   search: this.listr
      // this.getlists()
      var that = this
      this.listr.filter((item) => {
        var na = item.indexOf(this.search)
        //  console.log(item)、
        if (this.search === '') {
          this.list.splice(0)
        }
        if (na !== -1 && this.search !== '') {
          // item.push(...that.list)
          console.log(item)
          this.list.push(item)
          this.isshow = false
        }
        if (this.search !== '' && this.list.length === 0) {
        // console.log(that.list)
          this.isshow = true
        } else {
          this.isshow = false
        }
      })
    }
  },

  created () {
    this.listr = this.cinameName
  }
}
</script>

<style>
.search_top {
  height: 49px;
  font-size: 14px;
}
</style>
