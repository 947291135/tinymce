import AMap from 'AMap' // 引入高德地图
export default {
  data () {
    return {
      polygonBtn: {
        type: 'default',
        text: '多边形围栏',
        tip: false,
        tipText: '您正在编辑多边形围栏, 如需重新绘制区域请点击取消, 绘制时点击地图标记/双击完成绘制'
      },
      polygonForm: {
        fenceName: '',
        fenceType: '',
        station: '',
        lng: '',
        lat: '',
        area: '',
        addr: '',
        province: '',
        city: '',
        district: '',
        remark: ''
      },
      polygon: null,
      polygonPathList: [],
      polygonDialog: false
    }
  },
  methods: {
    // 编辑时初始化
    polygonEditInit () {
      // 多边形
      let wps84Path = JSON.parse(this.detailData.coordinates)
      this.wgs84ToAmap(
        wps84Path.map(item => {
          return [item.lng, item.lat]
        })
      ).then(res => {
        let path = res
        let [lng, lat] = this.getCenterPoint(path)
        this.map.setCenter([lng, lat]) // 定位到当前围栏
        let curPath = path.map(item => {
          return [item.lng, item.lat]
        })
        this.addPolygon(curPath, true) // 添加多边形
        this.polygonPopVisible(true, {
          // 表单
          ...this.detailData,
          fenceType: String(this.detailData.fenceType),
          station:
            String(this.detailData.fenceType) === '1'
              ? this.detailData.stationCode
              : this.detailData.repaireStationCode
        }, curPath)
      })
    },
    // 开始绘制
    startPaintPolygon (type = 'add', options = {}) {
      this.pointStatus = 'polygon'
      this.polygonBtn.type = 'success'
      this.polygonBtn.text = '取消标记'
      this.polygonBtn.tip = true
      if (type === 'edit') {
        this.polygonBtn.tipText =
          '您正在编辑多边形围栏, 如需重新绘制区域请点击取消, 绘制时点击地图标记/双击完成绘制'
      } else {
        this.polygonBtn.tipText =
          '您正在使用多边形围栏, 点击地图标记/双击完成绘制 或 点击按钮取消标记'
        this.map.setDefaultCursor('copy')
        this.paintPolygon()
      }
    },
    // 取消绘制
    stopPaintPolygon () {
      this.pointStatus = ''
      this.polygonPopVisible(false)
      this.map.setDefaultCursor('pointer')
      this.mouseTool.close(true) // 结束绘制
      this.polygonBtn.type = 'default'
      this.polygonBtn.text = '多边形围栏'
      this.polygonBtn.tip = false
    },
    // 开始绘制多边形围栏
    paintPolygon () {
      const options = {
        strokeColor: '#00a680',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#1791fc',
        fillOpacity: 0.1,
        strokeStyle: 'solid',
        zIndex: 50
      }
      this.mouseTool.polygon(options)
      this.mouseTool.on('draw', e => {
        // e.obj 为绘制出来的覆盖物对象
        let path = e.obj.getPath()
        this.addPolygon(path)
      })
    },
    // 表单窗口
    polygonPopVisible (visible = false, options = {}, curPath) {
      if (visible) {
        options.fenceName && (this.polygonForm.fenceName = options.fenceName)
        options.fenceType &&
          (this.polygonForm.fenceType = String(options.fenceType))
        options.station && (this.polygonForm.station = String(options.station))
        options.lng && (this.polygonForm.lng = options.lng)
        options.lat && (this.polygonForm.lat = options.lat)
        options.addr && (this.polygonForm.addr = options.addr)
        options.remark && (this.polygonForm.remark = options.remark)
        this.polygonForm.area =
          Math.round(AMap.GeometryUtil.ringArea(curPath)) / (1000 * 1000)
      } else {
        this.polygonForm.province = ''
        this.polygonForm.city = ''
        this.polygonForm.district = ''
        if (this.isEdit) {
          this.circleForm.fenceType = this.polygonForm.fenceType
          this.circleForm.station = this.polygonForm.station
          this.polygonForm.fenceName = ''
          this.polygonForm.lng = ''
          this.polygonForm.lat = ''
          this.polygonForm.radius = '100'
          this.polygonForm.area = ''
          this.polygonForm.addr = ''
          this.polygonForm.remark = ''
        } else {
          // this.$refs.polygonForm.resetFields()
        }
      }
      this.polygonDialog = visible
    },
    // 添加多边形
    addPolygon (path, isParent) {
      let polygon = new AMap.Polygon({
        path,
        strokeColor: '#00a680',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#1791fc',
        fillOpacity: 0.1,
        bubble: true,
        strokeStyle: 'solid',
        zIndex: 50
      })
      // 记录游标值
      if (isParent) {
        this.polygon = polygon
        this.map.setFitView([polygon])
      } else {
        this.polygonPathList.push(polygon)
      }
      this.map.add(polygon)
      // let polyEditor = new AMap.PolygonEditor(this.map,polygon)
      // polyEditor.open()
    },
    // 删除多边形
    removePolygon () {
      this.mouseTool.close(true)
      this.polygon && this.map.remove(this.polygon)
    },
    // 获取多边形中心
    getCenterPoint (path) {
      var x = 0.0
      var y = 0.0
      for (var i = 0; i < path.length; i++) {
        x = x + parseFloat(path[i].lng)
        y = y + parseFloat(path[i].lat)
      }
      x = (x / path.length).toFixed(6)
      y = (y / path.length).toFixed(6)

      return [x, y]
    }
  }
}
