import AMap from 'AMap' // 引入高德地图
export default {
  data () {
    return {
      circleBtn: {
        type: 'default',
        text: '圆形围栏',
        tip: false
      },
      circleDialog: false,
      circleLoading: false,
      circleForm: {
        fenceName: '',
        fenceType: '',
        station: '',
        lng: '',
        lat: '',
        radius: '100',
        area: '',
        addr: '',
        province: '',
        city: '',
        district: '',
        remark: ''
      }
    }
  },
  methods: {
    startPaintCircle () {
      this.pointStatus = 'circle'
      // 地图点击事件注册
      this.map.on('click', this.clickHandler)
      this.map.setDefaultCursor('copy')
      this.circleBtn.type = 'success'
      this.circleBtn.text = '取消标记'
      this.circleBtn.tip = true
    },
    // 关闭绘图事件
    stopPaintCircle () {
      this.pointStatus = ''
      this.removeMarker()
      this.circlePopVisible(false)
      this.map.setDefaultCursor('pointer')
      this.circleBtn.type = 'default'
      this.circleBtn.text = '圆形围栏'
      this.circleBtn.tip = false
    },
    // 删除标点
    removeMarker () {
      this.marker && this.map.remove(this.marker)
    },
    // 添加圆形
    addCircle (radius = 200, lng, lat) {
      console.log(lng, lat)
      this.circle = new AMap.Circle({
        center: [lng, lat],
        radius, // 半径
        borderWeight: 3,
        strokeColor: '#00a680',
        strokeOpacity: 1,
        bubble: true,
        fillOpacity: 0.1,
        fillColor: '#1791fc',
        zIndex: 50
      })
      this.circle.setMap(this.map)
      // 缩放地图到合适的视野级别
      this.map.setFitView([this.circle])
    },
    // 表单窗口
    circlePopVisible (visible = false, options = {}) {
      if (visible) {
        options.radius && (this.circleForm.radius = options.radius)
        options.fenceName && (this.circleForm.fenceName = options.fenceName)
        options.fenceType &&
        (this.circleForm.fenceType = String(options.fenceType))
        options.station && (this.circleForm.station = String(options.station))
        options.lng && (this.circleForm.lng = options.lng)
        options.lat && (this.circleForm.lat = options.lat)
        options.addr && (this.circleForm.addr = options.addr)
        options.remark && (this.circleForm.remark = options.remark)
        let curRadius = this.circleForm.radius || 200
        let radius = Number(curRadius) / 1000
        this.circleForm.area = (3.14 * radius * radius).toFixed(3) || ''
      } else {
        this.circleForm.province = ''
        this.circleForm.city = ''
        this.circleForm.district = ''
        if (this.isEdit) {
          this.polygonForm.fenceType = this.circleForm.fenceType
          this.polygonForm.station = this.circleForm.station
          this.circleForm.fenceName = ''
          this.circleForm.lng = ''
          this.circleForm.lat = ''
          this.circleForm.radius = '100'
          this.circleForm.area = ''
          this.circleForm.addr = ''
          this.circleForm.remark = ''
        }
      }
      this.circleDialog = visible
    },
    circleSubmit () {
      this.$refs.circleForm.validate(valid => {
        if (valid) {
          this.formLoading = true
          let type = Number(this.circleForm.fenceType)
          let stationCode = ''
          let stationName = ''
          let repaireStationCode = ''
          let repaireStationName = ''
          if (type === 1) {
            stationCode = this.circleForm.station
            stationName = this.$refs.stationCircle.selectedLabel
          } else if (type === 2) {
            repaireStationCode = this.circleForm.station
            repaireStationName = this.$refs.stationCircle.selectedLabel
          }
          if (this.detailData.id) {
            this.editCircleFence({
              id: this.detailData.id,
              stationCode,
              stationName,
              repaireStationCode,
              repaireStationName
            })
          } else {
            this.addCircleFence({
              stationCode,
              stationName,
              repaireStationCode,
              repaireStationName
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增
    addCircleFence ({
      stationCode,
      stationName,
      repaireStationCode,
      repaireStationName
    }) {
      // server
      //   .fenceAdd({
      //     fenceShape: 1, // 圆形
      //     fenceName: this.circleForm.fenceName,
      //     fenceType: this.circleForm.fenceType,
      //     stationCode,
      //     stationName,
      //     repaireStationCode,
      //     repaireStationName,
      //     lng: this.circleForm.lng,
      //     lat: this.circleForm.lat,
      //     radius: this.circleForm.radius,
      //     fenceSize: this.circleForm.area,
      //     addr: this.circleForm.addr,
      //     provinceName: this.circleForm.province,
      //     cityName: this.circleForm.city || this.circleForm.province,
      //     areaName: this.circleForm.district,
      //     remark: this.circleForm.remark
      //   })
      //   .then(res => {
      //     if (res.data.code == 200) {
      //       this.$message.success('执行成功')
      //       this.$store.dispatch('delVisitedViews', this.$route).then(() => {
      //         this.$router.push('/chargeOperation/fence')
      //       })
      //     } else {
      //       this.$message({
      //         type: 'error',
      //         message: res.data.msg
      //       })
      //     }
      //   })
      //   .finally(() => {
      //     this.formLoading = false
      //   })
    },
    // 编辑
    editCircleFence ({
      id,
      stationCode,
      stationName,
      repaireStationCode,
      repaireStationName
    }) {
      // server
      //   .fenceEdit({
      //     id,
      //     fenceShape: 1,
      //     fenceName: this.circleForm.fenceName,
      //     fenceType: this.circleForm.fenceType,
      //     stationCode,
      //     stationName,
      //     repaireStationCode,
      //     repaireStationName,
      //     lng: this.circleForm.lng,
      //     lat: this.circleForm.lat,
      //     radius: this.circleForm.radius,
      //     fenceSize: this.circleForm.area,
      //     addr: this.circleForm.addr,
      //     provinceName: this.circleForm.province,
      //     cityName: this.circleForm.city || this.circleForm.province,
      //     areaName: this.circleForm.district,
      //     remark: this.circleForm.remark
      //   })
      //   .then(res => {
      //     if (res.data.code == 200) {
      //       this.$message.success('执行成功')
      //       this.$store.dispatch('delVisitedViews', this.$route).then(() => {
      //         this.$router.push('/chargeOperation/fence')
      //       })
      //     } else {
      //       this.$message({
      //         type: 'error',
      //         message: res.data.msg
      //       })
      //     }
      //   })
      //   .finally(() => {
      //     this.formLoading = false
      //   })
    },
    // 半径改变
    radiusChange (value) {
      let radius = Number(value) / 1000
      this.circleForm.area = (3.14 * radius * radius).toFixed(3)
      this.addCircle(value, this.curLng, this.curLat)
    },
    // 编辑时初始化
    circleEditInit () {
      let wps84 = [Number(this.detailData.lng), Number(this.detailData.lat)]
      this.wgs84ToAmap(wps84).then(res => {
        let lng = Number(res[0].lng)
        let lat = Number(res[0].lat)
        // console.log('edit-gd', lng, lat);
        // console.log('edit-wps84', this.detailData.lng, this.detailData.lat);
        this.startPaintCircle()
        this.addCircle(this.detailData.radius || 200, lng, lat) // 添加圆
        this.setAddr(lng, lat, 200, false) // 经纬度逆向编码
        this.circlePopVisible(true, {
          ...this.detailData,
          fenceType: String(this.detailData.fenceType),
          station:
          String(this.detailData.fenceType) === '1'
            ? this.detailData.stationCode
            : this.detailData.repaireStationCode
        }) // 显示表单
        this.getStaionsCircle(this.detailData.fenceType) // 围栏类型
      })
    },
    // 类型改变
    fenceTypeChangeCircle (value) {
      this.circleForm.station = ''
      this.stationOptions = []
    },
    // 获取场站
    getStaionsCircle (type) {
      let text =
      String(type) === '1'
        ? this.detailData.stationName
        : this.detailData.repaireStationName
      this.remoteMethod(text)
    },
    // 删除圆
    removeCircle () {
      if (this.circle) {
        this.curLng = ''
        this.curLat = ''
        this.circleRadius = 200
        this.map.remove(this.circle)
      }
    }
  }
}
