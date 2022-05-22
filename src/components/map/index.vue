<template>
  <div class="Map">
    <div id="map"></div>
    <div class="tool-list">
      <el-tooltip
        effect="light"
        content="您正在使用圆形围栏, 点击地图标记 或 点击按钮取消标记"
        placement="bottom"
        v-model="circleBtn.tip"
        manual
      >
        <el-button
          icon="el-icon-location"
          :type="circleBtn.type"
          @click="btnClick('circle', true)"
        >{{circleBtn.text}}</el-button>
      </el-tooltip>
      <el-tooltip
        effect="light"
        placement="bottom"
        v-model="polygonBtn.tip"
        :content="polygonBtn.tipText"
        manual
      >
        <el-button
          icon="el-icon-star-on"
          :type="polygonBtn.type"
          @click="btnClick('polygon')"
        >{{polygonBtn.text}}</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
import circle from '@/components/map/functions/mixin/circle.js'
import polygon from '@/components/map/functions/mixin/polygon.js'
import gcoord from 'gcoord'
// const code = require('@/assets/pca-code.json')
export default {
  name: 'Map',
  mixins: [circle, polygon],
  data () {
    return {
      map: null,
      mouseTool: null,
      pointStatus: '' // 标点状态: circle: 圆形标记, polygon: 多边形标记, 空: 正常
    }
  },
  props: {
    detailData: {
      type: Object,
      default () {
        return {
          addr: '广东省深圳市福田区华强北街道玮鹏花园',
          amapCoordinates: '',
          areaName: '福田区',
          cityName: '深圳市',
          coordinates: '[{"lng":"114.089637","lat":"22.545304"},{"lng":"114.090979","lat":"22.545273"},{"lng":"114.090818","lat":"22.544133"},{"lng":"114.089015","lat":"22.544035"}]',
          createAuthor: 123123123132,
          createAuthorName: '',
          createTime: 1620981710730,
          createTimeVal: '2021-05-14 16:41:50',
          fenceName: 'test2222',
          fenceNo: 'WL20210514001',
          fenceShape: 2,
          fenceShapeVal: '多边形',
          fenceSize: '0.021503',
          fenceType: 4,
          fenceTypeVal: '金融服务',
          id: 57,
          isDel: 0,
          lat: '22.544687',
          lng: '114.090112',
          pageNum: '',
          pageSize: '',
          provinceName: '广东省',
          radius: '',
          remark: '',
          repaireStationCode: '',
          repaireStationName: '',
          stationCode: '',
          stationName: '',
          status: 2,
          statusVal: '已通过'
        }
      }
    }
  },
  mounted () {
    Promise.all([
      this.initMap()
    ])
      .then(res => {
        this.addOrEdit()
      })
      .finally(() => {
        this.loading = false
      })
  },
  computed: {
    isEdit () {
      return !!this.detailData.id
    }
  },
  methods: {
    // 判断新增/编辑
    addOrEdit () {
      let type = Number(this.detailData.fenceShape)
      if (type === 1) {
        // 圆形
        this.circleEditInit()
      } else if (type === 2) {
        // 多边形
        this.polygonEditInit()
      }
    },
    initMap () {
      return new Promise((resolve, reject) => {
        this.map = new AMap.Map('map', {zoom: 17})
        AMap.plugin(
          [
            'AMap.Geocoder',
            'AMap.MouseTool'
          ],
          () => {
            this.mouseTool = new AMap.MouseTool(this.map)
            resolve()
          }
        )
      })
    },
    // 按钮点击事件
    btnClick (type) {
      if (this.pointStatus) {
        if (type !== this.pointStatus) {
          this.$message.warning(
            '请先取消正在操作的其他围栏, 再进行该操作'
          )
        } else {
          if (type === 'circle') {
            this.stopPaintCircle()
          } else if (type === 'polygon') {
            this.stopPaintPolygon()
          }
        }
      } else {
        if (type === 'circle') {
          this.startPaintCircle()
        } else if (type === 'polygon') {
          this.startPaintPolygon()
        }
      }
    },
    // 地图点击事件
    clickHandler (e) {
      // 圆形
      if (this.pointStatus === 'circle') {
        let lng = e.lnglat.getLng()
        let lat = e.lnglat.getLat()
        let wps84 = this.amapTo84([lng, lat])
        this.addCircle(200, lng, lat) // 添加圆
        this.circlePopVisible(true, { ...this.detailData, lng: wps84[0], lat: wps84[1] }) // 显示表单
      }
    },
    remoteMethod (value) {
      let type =
        this.pointStatus === 'circle'
          ? String(this.circleForm.fenceType)
          : String(this.polygonForm.fenceType)
      if (type === '1') {
        this.stationLoading = true
        this.getCarStation({ stationName: value }).finally(() => {
          this.stationLoading = false
        })
      } else if (type === '2') {
        this.stationLoading = true
        this.getRepairStation({ repaireStationName: value }).finally(
          () => {
            this.stationLoading = false
          }
        )
      }
    },
    // 高德坐标转84坐标
    amapTo84 (lnglat) {
      return gcoord
        .transform(
          lnglat.map(item => Number(item)), // 经纬度坐标
          gcoord.AMap, // 当前坐标系
          gcoord.WGS84 // 目标坐标系
        )
        .map(item => Number(item).toFixed(6))
    },
    // 84转高德
    wgs84ToAmap (lnglat) {
      return new Promise((resolve, reject) => {
        AMap.convertFrom(lnglat, 'gps', (status, result) => {
          if (result.info === 'ok') {
            resolve(result.locations)
          }
        })
      })
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
  left: 10px;
  z-index: 999999;
}
.Map .tool-list {
  position: absolute;
  top: 30px;
  right: 30px;
}
</style>
