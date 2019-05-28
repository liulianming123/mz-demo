<template>
  <div id="map">
  <div class="map" @click="$router.push({path:'city'})">
      <van-icon name="location-o" />
      <span>{{ curCity }}</span>
  </div>
  <div id="allmap"></div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import { mapState } from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    mappostion() {
      var map = new BMap.Map("allmap"); // 创建Map实例
      map.centerAndZoom(this.curCity, 15); // 初始化地图,用城市名设置地图中心点
      map.setCurrentCity(this.curCity);
      map.enableScrollWheelZoom(true);
   
    setTimeout(() => {
      window.isto = false
        var geolocation = new BMap.Geolocation();
        var a = null; var b = null;
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            // alert('您的位置：'+r.point.lng+','+r.point.lat);
            Dialog.alert({
              message: '您的位置：'+r.point.lng+','+r.point.lat
            }).then(() => {
                
            });
          } else {
            alert("failed" + this.getStatus());
          }
        },
        { enableHighAccuracy: true }
      );


    }, 3000);

    function showInfo(e){
		alert(e.point.lng + ", " + e.point.lat);
	}
	map.addEventListener("click", showInfo);

     },

  },

  computed:{
         ...mapState('city',[
        'curCity'
    ])
  },

  created() {},
  mounted() {
    this.mappostion();
  }
};
</script>

<style>
#map{
     height: 100%;
  width: 100%;
      overflow: scroll;
  overflow-y: hidden;
}
#allmap {
  height: 100%;
  width: 100%;
  overflow: scroll;
  overflow-y: hidden;
}
.map{
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 100;
    font-size: 14px;
    height: 20px;
    border: 1px solid #f2f2f2;
    padding: 3px;
    border-radius: 30%;
    text-align: center;
    line-height: 20px;
}
</style>
