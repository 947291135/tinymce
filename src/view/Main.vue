<template>
    <div class="main">
        <div class="header">
            <Header />
        </div>
        <div class="conten">
            <div class="conten-top">
                <el-row :gutter="10">
                    <el-col :span="3">
                        <dv-border-box-12 class="item">
                            <data-statistics-one :info="info"/>
                        </dv-border-box-12>
                    </el-col>
                    <el-col :span="5">
                        <dv-border-box-12 class="item">
                            <map-echarts-tow :info="info.mapData"/>
                        </dv-border-box-12>
                    </el-col>
                    <el-col :span="7">
                        <TaskObjectivesTherr/>
                    </el-col>
                    <el-col :span="5">
                      <ProcessAnalysisFour />
                    </el-col>
                    <el-col :span="4">
                        <dv-border-box-12 class="item">
                            <div class="test">数据排行</div>
                        </dv-border-box-12>
                    </el-col>
                </el-row>
            </div>
            <div class="conten-bottom">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <dv-border-box-12 >
                            <div class="test">数据统计</div>
                        </dv-border-box-12>
                    </el-col>
                    <el-col :span="12">
                        <dv-border-box-12 >
                            <div class="test">满意度统计</div>
                        </dv-border-box-12>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Main/header.vue'
import DataStatisticsOne from '@/components/Main/DataStatisticsOne.vue'
import MapEchartsTow from '@/components/Main/MapEchartsTow.vue'
import TaskObjectivesTherr from '@/components/Main/TaskObjectivesTherr.vue'
import ProcessAnalysisFour from '@/components/Main/ProcessAnalysisFour.vue'
export default {
  data () {
    return {
      time: null, // 定时器
      info: {
        orderPrice: 0,
        contractPrice: 0,
        orderNumber: 0,
        contractNumber: 0,
        mapData: [
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
  created () {
    this.GetInfo()
    this.time = setInterval(() => {
      this.GetInfo()
    }, 5000)
  },
  methods: {
    GetInfo () {
      this.info = {
        orderPrice: this.sum(1000, 90000),
        contractPrice: this.sum(1000, 90000),
        orderNumber: this.sum(1, 999),
        contractNumber: this.sum(1, 999),
        typeDataList: [
          {value: this.sum(0, 999), name: '监理'},
          {value: this.sum(0, 999), name: '检测'},
          {value: this.sum(0, 999), name: '评估'},
          {value: this.sum(0, 999), name: '检验'},
          {value: this.sum(0, 999), name: '检修'},
          {value: this.sum(0, 999), name: '咨询'}
        ],
        mapData: [
          {
            name: '广州市',
            value: this.sum(0, 99)
          },
          {
            name: '韶关市',
            value: this.sum(0, 99)
          },
          {
            name: '深圳市',
            value: this.sum(0, 99)
          },
          {
            name: '珠海市',
            value: this.sum(0, 99)
          },
          {
            name: '汕头市',
            value: this.sum(0, 99)
          },
          {
            name: '佛山市',
            value: this.sum(0, 99)
          },
          {
            name: '江门市',
            value: this.sum(0, 99)
          },
          {
            name: '湛江市',
            value: this.sum(0, 99)
          },
          {
            name: '茂名市',
            value: this.sum(0, 99)
          },
          {
            name: '肇庆市',
            value: this.sum(0, 99)
          },
          {
            name: '惠州市',
            value: this.sum(0, 99)
          },
          {
            name: '梅州市',
            value: this.sum(0, 99)
          },
          {
            name: '汕尾市',
            value: this.sum(0, 99)
          },
          {
            name: '河源市',
            value: this.sum(0, 99)
          },
          {
            name: '阳江市',
            value: this.sum(0, 99)
          },
          {
            name: '清远市',
            value: this.sum(0, 99)
          },
          {
            name: '东莞市',
            value: this.sum(0, 99)
          },
          {
            name: '中山市',
            value: this.sum(0, 99)
          },
          {
            name: '潮州市',
            value: this.sum(0, 99)
          },
          {
            name: '揭阳市',
            value: this.sum(0, 99)
          },
          {
            name: '云浮市',
            value: this.sum(0, 99)
          }
        ]
      }
    },
    sum (m, n) {
      var num = Math.floor(Math.random() * (m - n) + n)
      return num
    }
  },
  beforeDestroy () {
    if (this.time) {
      clearInterval(this.time)
      this.time = null
    }
  },
  components: {
    Header,
    DataStatisticsOne,
    MapEchartsTow,
    TaskObjectivesTherr,
    ProcessAnalysisFour
  }
}
</script>

<style scoped>
.el-row,.el-col{
    height: 100%;
}
.main{
    background:#02040A url('~@/assets/img/mainBG.png') no-repeat center center;
    /* background-position:; */
    background-size: cover;
    position: absolute;
    min-width: 1700px; /*no*/
    min-height: 1200px;/*no*/
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.main .item{
    position: relative;
    padding: 10px; /*no*/
    box-sizing: border-box;
}
.main .header{
    flex: 0 0 80px; /*no*/
    margin-bottom: 10px;
}
.main .conten{
    flex: 1 1 auto;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.main .conten .conten-top{
    flex: 0 0 40%;
    margin-bottom: 10px;
}
.main .conten .conten-bottom{
    flex: 1;
}
.col{
    height: 0px; /*no*/
}
.test{
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
