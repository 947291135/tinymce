<template>
    <div class="DataStatisticsOne">
      <Title>
          <template slot="decoration"><dv-decoration-3 style="width:100%;height:100%;" /></template>
      </Title>
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
  GridComponent
} from 'echarts/components'
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, PieChart, CanvasRenderer]
)
export default {
  components: {
    Title
  }
}
</script>

<style scoped>
.DataStatisticsOne{
  background: #0B1124;
}
</style>
