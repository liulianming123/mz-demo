<template>
  <div class="my-cat">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="$router.push({ path: '/list'})"
    />

    <van-card
      v-for="item in catData"
      :key="item.goodId"
      :price="item.price"
      desc="描述信息"
      :title="item.name"
      :thumb="item.img"
    >
      <div slot="footer">
        <van-button size="mini" @click="fn5(item,item.price*item.num)">删除</van-button>
        <van-button size="mini" @click="fn3(item,item.price*item.num)">-</van-button>
        <span>{{ item.num }}</span>
        <van-button size="mini" @click="fn4(item,item.price*item.num)">+</van-button>
        <input type="checkbox" :id="item.goodId" :value="(item.price*item.num)" v-model="checkedprice">
      </div>
    </van-card>

    <van-submit-bar :price="prices" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkeds" @click="isquan">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
      return{
        checkeds: false,
        sum:[],
        checkedprice: []
      }
  },
  computed: {
    // ...mapState({
    //   catData: state => state.cat.catData
    // })
    ...mapState("cat", ["catData"]),
    prices(){
        var sum = 0
        for(var i = 0; i<this.checkedprice.length; i++){
           sum += this.checkedprice[i]
        }
        return sum*100;
    },
    isSum(){
      return this.sum =  this.catData.map(item => {
           return item.price*item.num
       })
    }
  },

  methods: {
    ...mapMutations("cat", ["catAdd", "catReduce", "deleteList"]),

    onSubmit(){
      alert("需要"+this.prices/100+"元,但是你没钱")
    },

    isquan(){
        if(this.checkeds === true ){
            this.checkedprice = this.isSum
        }else{
            this.checkedprice = []
        }
    },
    fn3(item,price){
        // this.checkedprice = []
        // console.log(price)
        var index = this.checkedprice.findIndex(item => item === price)
      this.checkedprice.splice(index, 1)
        this.catReduce(item)
    },
    fn4(item,price){
        // this.checkedprice = []
        // console.log(price)
        var index = this.checkedprice.findIndex(item => item === price)
      this.checkedprice.splice(index, 1)
        this.catAdd(item)
    },
    fn5(item,price){
        // this.checkedprice = []
        // console.log(price)
        var index = this.checkedprice.findIndex(item => item === price)
      this.checkedprice.splice(index, 1)
        this.deleteList(item)
    }
  },
  
  
};
</script>
