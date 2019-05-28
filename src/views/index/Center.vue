<template>
    <div id="main_one">
      <div @click="isShow = !isShow" class="yue"></div>
      <transition
      enter-active-class="animated bounceIn  myfast delay-3s"
      appear
      >
        <h1 v-if="isShow" class="night">晚安<br><b style="font-size:14px">愿你一生被善待</b></h1>
      </transition>

    </div>
</template>

<script>
// import { setInterval } from 'timers';
export default {
  data () {
    return {
      isShow: true,
      show: true
    }
  },

  methods: {
    getRand (min, max) {
      return parseInt(Math.random() * (max - min + 1)) + min
    },

    createStar () {
      var img = document.createElement('img')
      var main = document.getElementById('main_one')
      img.style.position = 'absolute'
      img.src = require('../../assets/xin_03.gif')
      main.appendChild(img)

      var randW = this.getRand(10, 20)
      img.style.width = randW + 'px'
      // left最小是0，最大是浏览器可视区的宽度
      // top最小是0,最大是浏览器可视区的高度
      // 浏览器可视区的宽度
      // window.innerWidth
      // 浏览器可视区的高度
      // window.innerHeight

      var randL = this.getRand(0, window.innerWidth - randW)
      var randT = this.getRand(0, window.innerHeight - randW)
      img.style.top = randT + 'px'
      img.style.left = randL + 'px'

      img.onclick = function () {
        // this.remove();
        this.parentNode.removeChild(img)
      }
    }

  },

  mounted () {
    setInterval(this.createStar, 1000)
  }
}
</script>

<style>
#main_one{
    background: url('../../assets/xing.jpg') no-repeat padding-box;
    background-size: 100% 100%;
    width: 100%;
    height: 620px;
}
.yue{
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
}
.night{
    color: aliceblue;
    font-weight: 200;
    position: absolute;
     left: 0;
    right: 0;
    bottom: 40px;
    top: 0;
    margin: auto;
    height: 20px;
    width: 100px;
    text-shadow: 2px 2px 2px;
    font-size: 24px;
}

</style>
