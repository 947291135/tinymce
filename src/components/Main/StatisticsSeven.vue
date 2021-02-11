<template>
    <div class="StatisticsSeven">
        <Title title='流程单数据统计' class="title"/>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script>
import Title from '@/components/Main/title.vue'
import * as echarts from 'echarts'
export default {
  data () {
    return {
      drawTiming: null,
      cdata: {
        year: null,
        weekCategory: [],
        radarData: [],
        radarDataAvg: [],
        maxData: 12000,
        weekMaxData: [],
        weekLineData: []
      },
      // 定义颜色
      colorList: {
        linearYtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#f5b44d'
            },
            {
              offset: 1,
              color: '#28f8de'
            }
          ]
        },
        linearGtoB: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#43dfa2'
            },
            {
              offset: 1,
              color: '#28f8de'
            }
          ]
        },
        linearBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#1c98e8'
            },
            {
              offset: 1,
              color: '#28f8de'
            }
          ]
        },
        areaBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(35,184,210,.2)'
            },
            {
              offset: 1,
              color: 'rgba(35,184,210,0)'
            }
          ]
        }
      }
    }
  },
  mounted () {
    this.drawTimingFn()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    resize () {
      this.charts.resize()
    },
    drawTimingFn () {
      let dom = this.$refs.charts
      this.charts = echarts.init(dom)
      this.setData()
      this.drawTiming = setInterval(() => {
        this.setData()
      }, 6000)
    },
    setData () {
      // 清空轮询数据
      let cdata = JSON.parse(JSON.stringify(this.cdata))
      cdata.weekCategory = []
      cdata.weekMaxData = []
      cdata.weekLineData = []
      cdata.radarData = []
      cdata.radarDataAvg = []

      let dateBase = new Date()
      cdata.year = dateBase.getFullYear()
      // 周数据
      for (let i = 0; i < 7; i++) {
        // 日期
        let date = new Date()
        cdata.weekCategory.unshift([date.getMonth() + 1, date.getDate() - i].join('/'))

        // 折线图数据
        cdata.weekMaxData.push(cdata.maxData)
        let distance = Math.round(Math.random() * 11000 + 500)
        cdata.weekLineData.push(distance)

        // 雷达图数据
        // 我的指标
        let averageSpeed = +(Math.random() * 5 + 3).toFixed(3)
        let maxSpeed = averageSpeed + +(Math.random() * 3).toFixed(2)
        let hour = +(distance / 1000 / averageSpeed).toFixed(1)
        let radarDayData = [distance, averageSpeed, maxSpeed, hour]
        cdata.radarData.unshift(radarDayData)

        // 平均指标
        let distanceAvg = Math.round(Math.random() * 8000 + 4000)
        let averageSpeedAvg = +(Math.random() * 4 + 4).toFixed(3)
        let maxSpeedAvg = averageSpeedAvg + +(Math.random() * 2).toFixed(2)
        let hourAvg = +(distance / 1000 / averageSpeed).toFixed(1)
        let radarDayDataAvg = [
          distanceAvg,
          averageSpeedAvg,
          maxSpeedAvg,
          hourAvg
        ]
        cdata.radarDataAvg.unshift(radarDayDataAvg)
        this.cdata = cdata
      }
    }
  },
  watch: {
    cdata: {
      handler (newData) {
        let cdata = this.cdata
        let options = {
          title: {
            text: '',
            textStyle: {
              color: '#D3D6DD',
              fontSize: 24,
              fontWeight: 'normal'
            },
            subtext: cdata && cdata.year + '/' + cdata && cdata.weekCategory[6],
            subtextStyle: {
              color: '#fff',
              fontSize: 16
            },
            top: 50,
            left: 80
          },
          legend: {
            top: 120,
            left: 80,
            orient: 'vertical',
            itemGap: 15,
            itemWidth: 12,
            itemHeight: 12,
            data: ['平均指标', '我的指标'],
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item'
          },
          radar: {
            center: ['68%', '27%'],
            radius: '40%',
            name: {
              color: '#fff'
            },
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                color: this.colorList.linearYtoG,
                opacity: 0.6
              }
            },
            splitLine: {
              lineStyle: {
                color: this.colorList.linearYtoG,
                opacity: 0.6
              }
            },
            splitArea: {
              areaStyle: {
                color: '#fff',
                opacity: 0.1,
                shadowBlur: 25,
                shadowColor: '#000',
                shadowOffsetX: 0,
                shadowOffsetY: 5
              }
            },
            indicator: [
              {
                name: '服务态度',
                max: cdata && cdata.maxData
              },
              {
                name: '产品质量',
                max: 10
              },
              {
                name: '任务效率',
                max: 12
              },
              {
                name: '售后保障',
                max: 3.5
              }
            ]
          },
          grid: {
            left: 90,
            right: 80,
            bottom: 40,
            top: '60%'
          },
          xAxis: {
            type: 'category',
            position: 'bottom',
            axisLine: true,
            axisLabel: {
              color: 'rgba(255,255,255,.8)',
              fontSize: 12
            },
            data: cdata && cdata.weekCategory
          },
          // 下方Y轴
          yAxis: {
            name: '工单',
            nameLocation: 'end',
            nameGap: 24,
            nameTextStyle: {
              color: 'rgba(255,255,255,.5)',
              fontSize: 14
            },
            max: cdata && cdata.maxData,
            splitNumber: 4,

            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                opacity: 0.1
              }
            },
            axisLabel: {
              color: 'rgba(255,255,255,.8)',
              fontSize: 12
            }
          },
          series: [
            {
              name: '',
              type: 'radar',
              symbolSize: 0,
              data: [
                {
                  value: cdata && cdata.radarDataAvg[6],
                  name: '平均指标',
                  itemStyle: {
                    normal: {
                      color: '#f8d351'
                    }
                  },
                  lineStyle: {
                    normal: {
                      opacity: 0
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: '#f8d351',
                      shadowBlur: 25,
                      shadowColor: 'rgba(248,211,81,.3)',
                      shadowOffsetX: 0,
                      shadowOffsetY: -10,
                      opacity: 1
                    }
                  }
                },
                {
                  value: cdata && cdata.radarData[6],
                  name: '我的指标',
                  itemStyle: {
                    normal: {
                      color: '#43dfa2'
                    }
                  },
                  lineStyle: {
                    normal: {
                      opacity: 0
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: this.colorList.linearGtoB,
                      shadowBlur: 15,
                      shadowColor: 'rgba(0,0,0,.2)',
                      shadowOffsetX: 0,
                      shadowOffsetY: 5,
                      opacity: 0.8
                    }
                  }
                }
              ]
            },
            {
              name: '',
              type: 'line',
              smooth: true,
              symbol: 'emptyCircle',
              symbolSize: 8,
              itemStyle: {
                normal: {
                  color: '#fff'
                }
              },
              lineStyle: {
                normal: {
                  color: this.colorList.linearBtoG,
                  width: 3
                }
              },
              areaStyle: {
                normal: {
                  color: this.colorList.areaBtoG
                }
              },
              data: cdata && cdata.weekLineData,
              lineSmooth: true,
              markLine: {
                silent: true,
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ],
                precision: 0,
                label: {
                  normal: {
                    formatter: '平均值: \n {c}'
                  }
                },
                lineStyle: {
                  normal: {
                    color: 'rgba(248,211,81,.7)'
                  }
                }
              },
              tooltip: {
                position: 'top',
                formatter: '{c} m',
                backgroundColor: 'rgba(28,152,232,.2)',
                padding: 6
              }
            },
            {
              name: '占位背景',
              type: 'bar',
              itemStyle: {
                normal: {
                  show: true,
                  color: '#000',
                  opacity: 0
                }
              },
              silent: true,
              barWidth: '50%',
              data: cdata && cdata.weekMaxData,
              animation: false
            }
          ]
        }
        this.charts.setOption(options)
      }
    }
  },
  components: {
    Title
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
    clearInterval(this.drawTiming)
  }
}
</script>

<style scoped>
.StatisticsSeven{
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
.StatisticsSeven .title{
    flex: 0 0 auto;
}
.StatisticsSeven .charts{
  flex: 1 1 auto;
  overflow: hidden;
}
</style>
