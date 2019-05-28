<template>
  <div id="aaa">
    
    <transition
      leave-active-class="animated fadeOut"
      mode="out-in">
     <keep-alive include="films">
    <router-view></router-view>
       </keep-alive>
        </transition>
  
  </div>
</template>

<style lang="less">
@import "../src/style/base.less";
#aaa{
  font-size: 14px;
  height: 100%;
}
</style>
