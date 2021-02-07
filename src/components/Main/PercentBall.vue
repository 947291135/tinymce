<template>
    <div class="percentBall" ref="percentBall"></div>
</template>

<script>
import * as echarts from 'echarts'
// import * as echarts from 'echarts/core'
// import {
//   CanvasRenderer
// } from 'echarts/renderers'
// import {
//   PieChart
// } from 'echarts/charts'
// import {
//   TitleComponent,
//   TooltipComponent,
//   GridComponent
// } from 'echarts/components'
// echarts.use(
//   [TitleComponent, TooltipComponent, GridComponent, PieChart, CanvasRenderer]
// )
export default {
  data () {
    return {
      charts: null,
      option: {
        title: {
          text: 0 + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            color: this.colorObj.textStyle,
            fontSize: 16
          }
        },
        series: {
          type: 'pie',
          radius: ['75%', '80%'],
          center: ['50%', '50%'],
          hoverAnimation: false,
          color: this.colorObj.series.color,
          label: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 0,
              itemStyle: {
                normal: {
                  color: this.colorObj.series.dataColor.normal,
                  shadowBlur: 10,
                  shadowColor: this.colorObj.series.dataColor.shadowColor
                }
              }
            },
            {
              value: 100
            }
          ]
        }
      }
    }
  },
  created () {
    this.$nextTick(() => {
      let dom = this.$refs.percentBall
      this.charts = echarts.init(dom)
      this.getData()
      window.addEventListener('resize', () => { // 执行
        this.charts.resize()
      })
    })
  },
  props: {
    value: {
      type: Number,
      required: true,
      default: 0
    },
    colorObj: {
      type: Object,
      default: function () {
        return {
          textStyle: '#3fc0fb',
          series: {
            color: ['#00bcd44a', 'transparent'],
            dataColor: {
              normal: '#03a9f4',
              shadowColor: '#97e2f5'
            }
          }
        }
      }
    }
  },
  watch: {
    value () {
      this.$nextTick(() => {
        this.getData()
      })
    }
  },
  methods: {
    getData () {
      this.option.series.data[0].value = this.value
      this.option.series.data[1].value = 100 - this.value
      this.option.title.text = this.value + '%'
      this.charts.setOption(this.option)
    }
  }
}
</script>

<style scoped>
.percentBall{
    width: 100%;
    height: 100%;
}
</style>
