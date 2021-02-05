<template>
    <div class="DataStatisticsOne">
      <Title title='任务通过率'>
          <template slot="decoration"><dv-decoration-3 style="width:100%;height:100%;" /></template>
      </Title>
      <div class="charts" ref="charts"></div>
      <div class="number">
        <div class="top">
          <div class="number_item">
            <span class="number_num">
              <i>￥</i>
              <dv-digital-flop :config="orderNumber"/>
            </span>
            <span class="number_text">订单收益金额</span>
          </div>
          <div class="number_item">
            <span class="number_num">
              <i>￥</i>
              <dv-digital-flop :config="contractNumber"/>
            </span>
            <span class="number_text">合同收益金额</span>
          </div>
        </div>
        <div class="bottom">
          <div class="number_item">
            <span class="number_num">
              <dv-digital-flop :config="contractNumber"/>
            </span>
            <span class="number_text">订单数量</span>
          </div>
          <div class="number_item">
            <span class="number_num">
              <dv-digital-flop :config="contractNumber"/>
            </span>
            <span class="number_text">合同数量</span>
          </div>
        </div>
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
  PieChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, PieChart, CanvasRenderer, LegendComponent]
)
export default {
  data () {
    return {
      charts: null,
      option: {
        legend: {
          width: '170',
          left: 'center',
          top: 'bottom',
          icon: 'circle',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = {top: 60}
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
            return obj
          }
        },
        series: {
          name: '任务通过率',
          type: 'pie',
          roseType: 'area',
          itemStyle: {
            borderRadius: 2
          },
          label: {
            color: '#fff',
            backgroundColor: 'transparent'
          },
          radius: '100%',
          center: ['50%', '50%'],
          top: 10,
          bottom: 50,
          labelLine: {
            length: 0,
            length2: 5
          },
          data: [
            {value: 0, name: '监理'},
            {value: 0, name: '检测'},
            {value: 0, name: '评估'},
            {value: 0, name: '检验'},
            {value: 0, name: '检修'},
            {value: 0, name: '咨询'}
          ]
        }
      }
    }
  },
  created () {
    this.$nextTick(() => {
      let dom = this.$refs.charts
      this.charts = echarts.init(dom)
      this.charts.setOption(this.option)
      this.getData()
      window.addEventListener('resize', () => { // 执行
        this.charts.resize()
      })
    })
  },
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    info: {

    }
  },
  methods: {
    getData () {
      setTimeout(() => {
        this.option.series.data = [
          {value: 10, name: '监理'},
          {value: 5, name: '检测'},
          {value: 80, name: '评估'},
          {value: 18, name: '检验'},
          {value: 150, name: '检修'},
          {value: 50, name: '咨询'}
        ]
        this.charts.setOption(this.option)
      }, 1000)
      // 使用刚指定的配置项和数据显示图表。
    },
    formatter (number) {
      const numbers = number.toString().split('').reverse()
      const segs = []

      while (numbers.length) segs.push(numbers.splice(0, 3).join(''))

      return segs.join(',').split('').reverse().join('')
    }

  },
  computed: {
    orderNumber () {
      let obj = {
        number: [0],
        content: '{nt}',
        formatter: this.formatter
      }
      if (this.info.orderMoney) {
        obj.number = [this.info.orderMoney.toFixed(2)]
      }
      return obj
    },
    contractNumber () {
      let obj = {
        number: [0],
        content: '{nt}',
        formatter: this.formatter
      }
      if (this.info.contractMoney) {
        obj.number = [this.info.orderMoney.toFixed(2)]
      }
      return obj
    }
  },
  components: {
    Title
  }
}
</script>

<style scoped>
.DataStatisticsOne{
  background: #0B1124;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.charts{
  flex: 1 1 auto;
  width: 100%;
}
.number{
  flex: 0 0 100px; /*no*/
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
}
.number > div{
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.number > div > div{
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.number .number_item  span.number_num{
  flex: 1;
}
.number .number_item  span.number_text{
  flex: 0 0 10px ;/*no*/
}
</style>
