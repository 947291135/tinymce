<template>
    <div class="MapEchartsTow">
      <Title title='地图数据'>
          <template slot="decoration"><dv-decoration-1 style="width:100%;height:100%;" /></template>
      </Title>
      <div class="charts" ref="charts"></div>
    </div>
</template>

<script>
import axios from 'axios'
import Title from '@/components/Main/title.vue'
import {GuangZhouGeoCoordMap} from '@/assets/js/mapData.js'
import * as echarts from 'echarts'
const showData = [
  {
    name: '广州市'
  },
  {
    name: '韶关市'
  },
  {
    name: '深圳市'
  },
  {
    name: '珠海市'
  },
  {
    name: '汕头市'
  },
  {
    name: '佛山市'
  },
  {
    name: '江门市'
  },
  {
    name: '湛江市'
  },
  {
    name: '茂名市'
  },
  {
    name: '肇庆市'
  },
  {
    name: '惠州市'
  },
  {
    name: '梅州市'
  },
  {
    name: '汕尾市'
  },
  {
    name: '河源市'
  },
  {
    name: '阳江市'
  },
  {
    name: '清远市'
  },
  {
    name: '东莞市'
  },
  {
    name: '中山市'
  },
  {
    name: '潮州市'
  },
  {
    name: '揭阳市'
  },
  {
    name: '云浮市'
  }
]
const convertData = function (data) {
  let scatterData = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = GuangZhouGeoCoordMap[data[i].name]
    if (geoCoord) {
      scatterData.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return scatterData
}
export default {
  data () {
    return {
      intervalId: null, // 轮询定时器
      charts: null,
      option: {
        // showLegendSymbol: true,
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontSize: 14,
            lineHeight: 22
          },
          position: (pos, params, dom, rect, size) => {
            // 固定在顶部
            return [pos[0] + 20, pos[1] - 20]
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          show: false,
          seriesIndex: 0,
          // 颜色
          inRange: {
            color: ['rgba(41,166,206)', 'rgba(101, 143, 255, .9)']
          }
        },
        // 底部背景
        geo: {
          show: true,
          aspectScale: 0.85, // 长宽比
          zoom: 1.2,
          map: 'GuangZhou',
          roam: false,
          itemStyle: {
            normal: {
              areaColor: 'rgba(0,0,0,0)',
              shadowColor: 'rgba(7,114,204, .8)',
              shadowOffsetX: 5,
              shadowOffsetY: 5
            },
            emphasis: {
              areaColor: '#00aeef'
            }
          }
        },
        series: [{
          name: '地区完成量',
          type: 'map',
          map: 'GuangZhou',
          roam: false, // 开启缩放
          aspectScale: 0.85, // 长宽比
          zoom: 1.2, // 默认显示大小
          itemStyle: {
            areaColor: '#299FE4',
            borderColor: 'rgba(0,242,252,.3)',
            borderWidth: 1,
            shadowBlur: 7,
            shadowColor: '#00f2fc'
          },
          label: {
            formatter: params => `${params.name}`,
            show: true,
            position: 'insideRight',
            textStyle: {
              fontSize: 14,
              color: '#efefef'
            }
          },
          select: {
            label: {
              color: '#fff'
            },
            itemStyle: {
              areaColor: 'rgb(60,113,255)',
              borderColor: 'rgba(0,242,252,.6)',
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: '#00f2fc'
            }
          },
          data: this.info
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          symbolSize: 7,
          effectType: 'ripple',
          legendHoverLink: true,
          showEffectOn: 'render',
          rippleEffect: {
            period: 4,
            scale: 2.5,
            brushType: 'stroke'
          },
          zlevel: 1,
          itemStyle: {
            normal: {
              color: '#99FBFE',
              shadowBlur: 5,
              shadowColor: '#fff'
            }
          },
          tooltip: {
            show: false
          },
          data: convertData(showData)
        }]
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.$http.get('/static/map/GuangZhou.json').then(res => {
        if (res) {
          echarts.registerMap('GuangZhou', res)
          let dom = this.$refs.charts
          this.charts = echarts.init(dom)
          this.charts.setOption(this.option)
          // 重新选择区域
          this.handleMapRandomSelect()
          window.addEventListener('resize', () => { // 执行
            this.charts.resize()
          })
        }
      })
    })
  },
  props: {
    info: {
      type: Array,
      default () {
        return [
          {
            name: '广州市',
            value: 0
          },
          {
            name: '韶关市',
            value: 0
          },
          {
            name: '深圳市',
            value: 0
          },
          {
            name: '珠海市',
            value: 0
          },
          {
            name: '汕头市',
            value: 0
          },
          {
            name: '佛山市',
            value: 0
          },
          {
            name: '江门市',
            value: 0
          },
          {
            name: '湛江市',
            value: 0
          },
          {
            name: '茂名市',
            value: 0
          },
          {
            name: '肇庆市',
            value: 0
          },
          {
            name: '惠州市',
            value: 0
          },
          {
            name: '梅州市',
            value: 0
          },
          {
            name: '汕尾市',
            value: 0
          },
          {
            name: '河源市',
            value: 0
          },
          {
            name: '阳江市',
            value: 0
          },
          {
            name: '清远市',
            value: 0
          },
          {
            name: '东莞市',
            value: 0
          },
          {
            name: '中山市',
            value: 0
          },
          {
            name: '潮州市',
            value: 0
          },
          {
            name: '揭阳市',
            value: 0
          },
          {
            name: '云浮市',
            value: 0
          }
        ]
      }
    }
  },
  watch: {
    // info (newVal) {
    //   this.$nextTick(() => {
    //     this.getData()
    //   })
    // }
  },
  methods: {
    // 开启定时器
    startInterval () {
      const _self = this
      // 应通过接口获取配置时间，暂时写死5s
      const time = 2000
      if (this.intervalId !== null) {
        clearInterval(this.intervalId)
      }
      this.intervalId = setInterval(() => {
        _self.reSelectMapRandomArea()
      }, time)
    },
    getData () {
      this.option.series[0].data = this.info
      this.charts.setOption(this.option)
      // 重新选择区域
      this.handleMapRandomSelect()
      // 使用刚指定的配置项和数据显示图表。
    },
    // 重新随机选中地图区域
    reSelectMapRandomArea () {
      const length = 9
      this.$nextTick(() => {
        const map = this.$refs.charts

        let index = Math.floor(Math.random() * length)
        while (index === this.preSelectMapIndex || index >= length) {
          index = Math.floor(Math.random() * length)
        }
        this.charts.dispatchAction({
          type: 'mapUnSelect',
          seriesIndex: 0,
          dataIndex: this.preSelectMapIndex
        })
        this.charts.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        this.charts.dispatchAction({
          type: 'mapSelect',
          seriesIndex: 0,
          dataIndex: index
        })
        this.preSelectMapIndex = index
      })
    },
    handleMapRandomSelect () {
      this.$nextTick(() => {
        const map = this.$refs.charts
        const _self = this
        setTimeout(() => {
          _self.reSelectMapRandomArea()
        }, 0)
        // 移入区域，清除定时器、取消之前选中并选中当前
        this.charts.on('mouseover', params => {
          clearInterval(_self.intervalId)
          this.charts.dispatchAction({
            type: 'mapUnSelect',
            seriesIndex: 0,
            dataIndex: _self.preSelectMapIndex
          })
          this.charts.dispatchAction({
            type: 'mapSelect',
            seriesIndex: 0,
            dataIndex: params.dataIndex
          })
          _self.preSelectMapIndex = params.dataIndex
        })
        // 移出区域重新随机选中地图区域，并开启定时器
        this.charts.on('globalout', function () {
          _self.reSelectMapRandomArea()
          _self.startInterval()
        })
        this.startInterval()
      })
    }

  },
  components: {
    Title
  }
}
</script>

<style scoped>
.MapEchartsTow{
  background:rgba(11,17,36,.7);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.charts{
  flex: 1 1 auto;
  width: 100%;
}
</style>
