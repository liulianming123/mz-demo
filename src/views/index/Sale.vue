<template>
  <div class="home-sale">
    <div class="brand">
      <ul>
        <li
          class="brand_item"
          v-for="brand in brandList"
          :key="brand.brandId"
          :class="{'active': parseInt(brand.brandId) === curBrandId }"
          @click="fn2(brand.brandId)"
        >{{ brand.brandName }}</li>
      </ul>
    </div>
    <div class="product">
      <ul>
        <li class="product_item" v-for="product in productList" :key="product.productId">
          <img :src="product.productLogo">
          <span>{{ product.productName }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BScroll from "better-scroll";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("phone", ["brandList", "curBrandId", "productList"])
    // 切换品牌 当前要切换的品牌id
    // change (id)
    // }
  },

  methods: {
    ...mapActions("phone", ["getBrandList", "getProductList", "change"]),
    fn2(id) {
      this.$router.replace({
        name: "sales",
        params: {
          brandId: id
        }
      });
    }
  },

  created() {
    console.log(this.$route.params.brandId);
    this.getBrandList();
    let curBrandId = this.$route.params.brandId;
    // this.getProductList()
    this.change(curBrandId);
  },

  mounted() {
    new BScroll(".brand",{
      scrollY: true,
      click: true
    }),
    new BScroll(".product")
  },

  beforeRouteUpdate(to, from, next) {
    // 因为组件被复用，导致 created不会被执行
    next();
    let curBrandId = this.$route.params.brandId;
    this.change(curBrandId);
  }
};
</script>

<style lang="less">
.home-sale {
  display: flex;
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;

  .brand {
    flex-shrink: 0;
    width: 80px;
    height: 100%;
    // overflow-y: auto;
    border-right: 1px solid #ececec;

    &_item {
      height: 42px;
      line-height: 42px;
      text-align: center;
      color: #949;
    }

    .active {
      color: #2b2d2e;
      font-weight: bold;
    }
  }

  .product {
    flex: 1;
    height: 100%;
    // overflow-y: auto;
    
    ul{
      overflow: hidden;
    }

    &_item {
      float: left;
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
      overflow: hidden;
      height: 150px;
      box-sizing: border-box;

      img {
        width: 86px;
        height: 86px;
        display: block;
      }

      span {
        font-size: 14px;
        text-align: center;
        margin: 0 20px;
      }
    }
  }
}
</style>
