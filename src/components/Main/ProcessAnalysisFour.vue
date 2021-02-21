<template>
    <div class="ProcessAnalysisFour">
        <div class="top">
            <Title title='各部门流程单完成量' class="title"/>
            <div class="process">
                <dv-capsule-chart :config="config" style="width:100%;height:100%" />
            </div>
        </div>
        <div class="bottom">
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script>
import Title from '@/components/Main/title.vue'
import * as echarts from 'echarts/core'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  RadarChart
} from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  RadarComponent
} from 'echarts/components'
echarts.use(
  [TooltipComponent, LegendComponent, RadarComponent, RadarChart, CanvasRenderer]
)
export default {
  data () {
    return {
      charts: null,
      option: {
        tooltip: {
        //   trigger: 'axis'
        },
        legend: {
          bottom: '0',
          width: 350,
          data: ['检验业务部', '技术质询部', '行政财务部', '顺海公司', '惠州业务部'],
          //   selectedMode: 'single',
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          icon: 'circle',
          itemGap: 20
        },
        radar: {
        // shape: 'circle',
          indicator: [
            { name: '流程单数量', max: 300 },
            { name: '合同数量', max: 300 },
            { name: '订单数量', max: 300 },
            { name: '完成数量', max: 300 },
            { name: '驳回数量', max: 300 },
            { name: '达标数量', max: 300 }
          ],
          center: ['50%', '40%'],
          radius: '60',
          shape: 'circle',
          splitNumber: 5,
          name: {
            textStyle: {
              color: 'rgb(238, 197, 102)'
            }
          },
          splitLine: {
            lineStyle: {
              color: ['rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)']
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.5)'
            }
          }
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          lineStyle: {
            width: 1,
            opacity: 0.5
          },
          bottom: 20,
          // areaStyle: {normal: {}},
          data: [
            {
              value: [105, 50, 45, 35, 5, 80],
              name: '检验业务部',
              itemStyle: {
                color: '#409EFF'
              }
            },
            {
              value: [85, 30, 55, 20, 10, 35],
              name: '技术质询部',
              itemStyle: {
                color: '#67C23A'
              }
            },
            {
              value: [151, 100, 51, 25, 8, 51],
              name: '行政财务部',
              itemStyle: {
                color: '#E6A23C'
              }
            },
            {
              value: [280, 150, 130, 120, 56, 130],
              name: '顺海公司',
              itemStyle: {
                color: '#F56C6C'
              }
            },
            {
              value: [99, 43, 51, 59, 1, 35],
              name: '惠州业务部',
              itemStyle: {
                color: '#ff52f7'
              }
            }
          ],
          symbol: 'none',
          itemStyle: {
            color: 'rgb(238, 197, 102)'
          },
          areaStyle: {
            opacity: 0.1
          }
        }]
      }
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return [
          {
            name: '检验业务部',
            value: 105
          },
          {
            name: '技术咨询部',
            value: 85
          },
          {
            name: '行政财务部',
            value: 151
          },
          {
            name: '顺海公司',
            value: 280
          },
          {
            name: '惠州业务部',
            value: 99
          }
        ]
      }
    },
    info: {
      type: Object,
      default () {
        return {}
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
  methods: {
    resize () {
      this.charts.resize()
    },
    GetData () {
      // 暂时不绑定动态数据
      this.charts.setOption(this.option)
    }
  },
  computed: {
    config () {
      let data = this.list
      return {
        data,
        unit: '个'
      }
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
.ProcessAnalysisFour{
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
.ProcessAnalysisFour .top{
    flex:0 0 40%;
    display: flex;
    flex-direction: column;
}
.ProcessAnalysisFour .top >>> .title{
    flex: 0 0 auto;
}
.ProcessAnalysisFour .top .process{
    flex: 1 1 auto;
}
.ProcessAnalysisFour .bottom{
    flex:1 1 60%;
    display: flex;
    align-items: stretch;
    justify-content: center;
}
.ProcessAnalysisFour .bottom .charts{
    width: 100%;
    height: 100%;
}
</style>
