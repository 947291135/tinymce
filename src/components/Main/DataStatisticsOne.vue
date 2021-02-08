<template>
    <div class="DataStatisticsOne">
      <Title title='业务类型通过率'>
          <template slot="decoration"><dv-decoration-3 style="width:100%;height:100%;" /></template>
      </Title>
      <div class="charts" ref="charts"></div>
      <div class="number">
        <div class="top">
          <div class="number_item">
            <span class="number_num">
              <dv-digital-flop :config="orderPrice" class="number_flop"/>
            </span>
            <span class="number_text">订单金额(￥)</span>
          </div>
          <div class="number_item">
            <span class="number_num">
              <dv-digital-flop :config="contractPrice" class="number_flop"/>
            </span>
            <span class="number_text">合同金额(￥)</span>
          </div>
        </div>
        <div class="bottom">
          <div class="number_item">
            <span class="number_num">
              <dv-digital-flop :config="orderNumber"/>
            </span>
            <span class="number_text">订单数量(个)</span>
          </div>
          <div class="number_item">
            <span class="number_num">
              <dv-digital-flop :config="contractNumber"/>
            </span>
            <span class="number_text">合同数量(份)</span>
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
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
echarts.use(
  [TooltipComponent, PieChart, CanvasRenderer, LegendComponent]
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
          radius: '70%',
          center: ['50%', '50%'],
          top: 0,
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
    info (newVal) {
      this.$nextTick(() => {
        this.getData()
      })
    }
  },
  methods: {
    getData () {
      this.option.series.data = this.info.typeDataList
      this.charts.setOption(this.option)
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
    orderPrice () {
      let obj = {
        number: [0],
        content: '{nt}',
        toFixed: 2
      }
      if (this.info.orderPrice) {
        if (this.info.orderPrice >= 10000) {
          obj.number = [Number((this.info.orderPrice / 10000).toFixed(2))]
          obj.content = '{nt}万'
        } else {
          obj.number = [Number(this.info.orderPrice)]
          obj.toFixed = 0
        }
      }
      return obj
    },
    contractPrice () {
      let obj = {
        number: [0],
        content: '{nt}',
        toFixed: 2
      }
      if (this.info.contractPrice) {
        if (this.info.contractPrice >= 10000) {
          obj.number = [Number((this.info.contractPrice / 10000).toFixed(2))]
          obj.content = '{nt}万'
        } else {
          obj.number = [Number(this.info.contractPrice)]
          obj.toFixed = 0
        }
      }
      return obj
    },
    orderNumber () {
      let obj = {
        number: [0],
        content: '{nt}',
        toFixed: 2
      }
      if (this.info.orderNumber) {
        if (this.info.orderNumber >= 10000) {
          obj.number = [Number((this.info.orderNumber / 10000).toFixed(2))]
          obj.content = '{nt}万'
        } else {
          obj.number = [Number(this.info.orderNumber)]
          obj.toFixed = 0
        }
      }
      return obj
    },
    contractNumber () {
      let obj = {
        number: [0],
        content: '{nt}',
        toFixed: 2
      }
      if (this.info.contractNumber) {
        if (this.info.contractNumber >= 10000) {
          obj.number = [Number((this.info.contractNumber / 10000).toFixed(2))]
          obj.content = '{nt}万'
        } else {
          obj.number = [Number(this.info.contractNumber)]
          obj.toFixed = 0
        }
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
.number{
  flex: 0 0 150px; /*no*/
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
  height: 100%;
}
.number .number_item  span.number_num{
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.number .number_item  span.number_num i{
  font-size: 24px; /*no*/
  color: #FDDC9D;
  font-style: normal;
  position: absolute;
  left: 5px; /*no*/
  top:50%;
  transform: translateY(-18px);/*no*/

}
.number .number_item  span.number_num  .number_flop{
  height: 100%;
}
.number .number_item  span.number_text{
  color: #d1d5f2;
  flex: 0 0 30px ;/*no*/
}
</style>
