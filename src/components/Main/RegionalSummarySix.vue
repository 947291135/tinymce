<template>
    <div class="RejectionRankingFive">
        <Title title='区域流程单数据统计' class="title"/>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script>
import Title from '@/components/Main/title.vue'
import * as echarts from 'echarts'
export default {
  data () {
    return {
      options: {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.1)',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,

              backgroundColor: '#7B7DDC'
            }
          },
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['已完成', '计划流程单', '完成率'],
          textStyle: {
            color: '#B4B4B4'
          },
          top: '0%'
        },
        grid: {
          x: '8%',
          width: '88%',
          bottom: 30,
          y: '6%'
        },
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },

            axisLabel: {
              formatter: '{value} '
            }
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              formatter: '{value} '
            }
          }
        ],
        series: [
          {
            name: '完成率',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#F02FC2'
              }
            },
            data: []
          },
          {
            name: '已完成',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#956FD4' },
                  { offset: 1, color: '#3EACE5' }
                ])
              }
            },
            data: []
          },
          {
            name: '计划流程单',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(156,107,211,0.8)' },
                  { offset: 0.2, color: 'rgba(156,107,211,0.5)' },
                  { offset: 1, color: 'rgba(156,107,211,0.2)' }
                ])
              }
            },
            z: -12,
            data: []
          }
        ]
      }
    }
  },
  created () {
    this.$nextTick(() => {
      let dom = this.$refs.charts
      this.charts = echarts.init(dom)
      this.GetData()
      window.addEventListener('resize', this.resize)
    })
  },
  props: {
    info: {
      type: Object,
      default () {
        return {
          category: [
            '广州市',
            '韶关市',
            '深圳市',
            '珠海市',
            '汕头市',
            '佛山市',
            '江门市',
            '湛江市',
            '茂名市',
            '肇庆市',
            '惠州市',
            '梅州市',
            '汕尾市',
            '河源市',
            '阳江市',
            '清远市',
            '东莞市',
            '中山市',
            '潮州市',
            '揭阳市',
            '云浮市'
          ],
          lineData: [
            18092,
            20728,
            24045,
            28348,
            32808,
            36097,
            39867,
            44715,
            48444,
            50415,
            56061,
            62677,
            59521,
            67560,
            18092,
            20728,
            24045,
            28348,
            32808,
            36097,
            39867
          ],
          barData: [
            4600,
            5000,
            5500,
            6500,
            7500,
            8500,
            9900,
            12500,
            14000,
            21500,
            23200,
            24450,
            25250,
            33300,
            4600,
            5000,
            5500,
            6500,
            7500,
            8500,
            9900
          ],
          rateData: []
        }
      }
    }
  },
  computed: {
    rateData () {
      let info = this.info
      let arr = []
      if (info && info.lineData && info.barData) {
        for (let i = 0; i < this.info.barData.length; i++) {
          let rate = this.info.barData[i] / this.info.lineData[i]
          arr.push(rate.toFixed(2))
        }
      }
      return arr
    }
  },
  methods: {
    resize () {
      this.charts.resize()
    },
    GetData () {
      this.options.xAxis.data = this.info.category
      this.options.series[0].data = this.rateData
      this.options.series[1].data = this.info.barData
      this.options.series[2].data = this.info.lineData
      this.charts.setOption(this.options)
    }
  },
  components: {
    Title
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style scoped>
.RejectionRankingFive{
  background:rgba(11,17,36,.7);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px; /*no*/
  box-sizing: border-box;
}
.RejectionRankingFive .title{
    flex: 0 0 auto;
}
.RejectionRankingFive .charts{
  flex: 1 1 auto;
  overflow: hidden;
}
</style>
