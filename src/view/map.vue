<template>
  <div class="Map">
    <div id="map"></div>
    <div class="select">
      <el-cascader
        style="margin-bottom: 10px;"
        ref="selectblur"
        size="large"
        placeholder="正在获取当前省市区"
        :options="code"
        filterable
        v-model="selectedOptions"
        @change="handleChange" disabled>
      </el-cascader>
      <br>
      <el-input
        placeholder="正在获取详细地址"
        v-model="textinput">
      </el-input>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
// const code = require('@/assets/pca-code.json')
export default {
  data () {
    return {
      map: null,
      selectedOptions: null,
      textinput: null,
      code: require('@/assets/pca-code.json')
    }
  },
  mounted () {
    this.loaderMap()
  },
  methods: {
    loaderMap () {
      let map = new AMap.Map('map')
      AMap.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          convert: false,
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: 'RB', // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          useNative: true
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition((status, result) => {
          console.log(status, result)
        })
        geolocation.getCityInfo((status, result) => {
          console.log(status, result)
        })
        // eslint-disable-next-line no-undef
        AMap.event.addListener(geolocation, 'complete', this.onComplete) // 返回定位信息
        // eslint-disable-next-line no-undef
        AMap.event.addListener(geolocation, 'error', this.onError) // 返回定位出错信息
      })
    },
    onComplete (data) {
      // alert(data.position.getLat(),data.position.getLng())
      console.log('纬度：' + data.position.getLat())
      console.log('经度：' + data.position.getLng())
      // restapi.amap.com/v3/geocode/regeo?key=您的key&location=113.88927,+22.50791
      // https://lbs.amap.com/api/webservice/guide/api/georegeo/
      this.$http.post(`https://restapi.amap.com/v3/geocode/regeo?key=cf52e631671d42bbba5d69bf33e69437&location=${data.position.getLng() + ',' + data.position.getLat()}`).then(rel => {
        if (rel.status === 1) {
          let adcode = rel.regeocode.addressComponent.adcode
          this.textinput = rel.regeocode.formatted_address
          if (!adcode) {
            return
          }
          let ProvinceCode = adcode.substring(0, 2)
          let cityCode = adcode.substring(0, 4)
          this.selectedOptions = [ProvinceCode, cityCode, adcode]
        }
      })
    },
    onError (data) { // 解析定位错误信息
      var str = '定位失败：'
      switch (data.info) {
        case 'PERMISSION_DENIED':
          str += '浏览器阻止了定位操作'
          break
        case 'POSITION_UNAVAILBLE':
          str += '无法获得当前位置'
          break
        case 'TIMEOUT':
          str += '定位超时'
          break
        default:
          str += '未知错误，移动端订单需https证书以及开启GPS'
          break
      }
      alert(str)
    },
    handleChange (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
.Map{
    /* padding: 20px 20px 0 20px; */
    height: 100%;
    box-sizing: border-box;
    position: relative;
}
#map{
  height: 100%;
}
.Map .select{
  position: absolute;
  top: 20px;
  right: 10px;
  z-index: 999999;
}
</style>
