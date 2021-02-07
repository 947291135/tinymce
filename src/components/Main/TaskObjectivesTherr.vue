<template>
    <div class="TaskObjectivesTherr">
        <div class="header">
            <div class="item" v-for="(item,index) of list" :key="index">
                <item-block :title="item.label" :number="item.value"/>
            </div>
        </div>
        <div class="conten">
            <div class="left">
                <Title title='今年流程单所在阶段个数'/>
                <div class="Table">
                    <dv-scroll-ranking-board class="TbaleMain" :config="typeDataList" style="width:100%;height:100%" />
                </div>
            </div>
            <div class="right">
                <div class="BallOne">
                    <div class="title">流程单完成率</div>
                    <div class="Percent">
                        <PercentBall :value="65" :colorObj="colorData[0]"/>
                    </div>
                </div>
                <div class="BallTow">
                    <div class="title">流程单驳回率</div>
                    <div class="Percent">
                        <PercentBall :value="35" :colorObj="colorData[1]"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemBlock from '@/components/Main/ItemBlock.vue'
import Title from '@/components/Main/title.vue'
import PercentBall from '@/components/Main/PercentBall.vue'
export default {
  data () {
    return {
      colorData: [
        {
          textStyle: '#3fc0fb',
          series: {
            color: ['#00bcd44a', 'transparent'],
            dataColor: {
              normal: '#03a9f4',
              shadowColor: '#97e2f5'
            }
          }
        },
        {
          textStyle: '#67e0e3',
          series: {
            color: ['#faf3a378', 'transparent'],
            dataColor: {
              normal: '#ff9800',
              shadowColor: '#fcebad'
            }
          }
        }
      ],
      list: [
        {
          label: '今年创建流程单数',
          value: 1024
        },
        {
          label: '本月创建流程单数',
          value: 83
        },
        {
          label: '今日完成流程单数',
          value: 2
        },
        {
          label: '今年流程单驳回数',
          value: 16
        },
        {
          label: '今年完成流程单数',
          value: 58
        },
        {
          label: '今年流程单达标数',
          value: 50
        }
      ]
    }
  },
  props: {
    info: {
      type: Object,
      default () {
        return {
          typeDataList: [
            {value: 10, name: '申请待审批'},
            {value: 30, name: '商务复核'},
            {value: 5, name: '派工管理'},
            {value: 6, name: '派工部门经理审核'},
            {value: 50, name: '作业交底信息填写'},
            {value: 3, name: '作业准备'},
            {value: 2, name: '完工管理'},
            {value: 1, name: '完工资料上传'},
            {value: 4, name: '完工报告审核'},
            {value: 6, name: '完工部门经理审核'},
            {value: 7, name: '归档管理'},
            {value: 8, name: '收费管理'},
            {value: 9, name: '商务核算'},
            {value: 4, name: '财务开票'},
            {value: 3, name: '已关闭'},
            {value: 58, name: '已完成'},
            {value: 13, name: '被驳回'}
          ]
        }
      }
    }
  },
  computed: {
    typeDataList () {
      let obj = {
        data: [...this.info.typeDataList]
      }
      console.log(obj)
      return obj
    }
  },
  components: {
    ItemBlock,
    Title,
    PercentBall
  }
}
</script>

<style scoped>
.TaskObjectivesTherr{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
    justify-content: center
}
.TaskObjectivesTherr > div{
    display: flex;
    align-items: stretch;
    justify-content: center;
}
.TaskObjectivesTherr > div.header{
    flex: 0 0 200px; /*no*/
    overflow: hidden;
    flex-wrap:wrap;
    margin-left:-5px; /*no*/
    margin-right: -5px; /*no*/
    /* margin-bottom: 5px; */
}
.TaskObjectivesTherr > div.conten{
    flex: 1 1 auto;
    overflow: hidden;
}
.TaskObjectivesTherr > div.conten > div{
    background: #0B1124;
    padding: 10px; /*no*/
    box-sizing: border-box;
}
.TaskObjectivesTherr > div.conten .left{
    flex: 0 0 70%;
    height: 100%;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
}
.TaskObjectivesTherr > div.conten .left .Table{
    flex: 1;
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
}
.TaskObjectivesTherr > div.conten .left .Table .TbaleMain{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}
.TaskObjectivesTherr > div.conten .right{
    flex: 0 0 30%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}
.TaskObjectivesTherr > div.conten .right > div{
    flex: 0 0 50%;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: center;
}
.TaskObjectivesTherr > div.conten .right > div .title{
    flex: 0 0 auto;
    text-align: center;
    color: #fff;
    font-size: 14px;/*no*/
}
.TaskObjectivesTherr > div.conten .right > div .Percent{
    flex: 1 1 auto;
    text-align: center;
}
.TaskObjectivesTherr > div.header .item{
    flex: 0 0 33%;
    height: 50%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:0 5px 10px 5px; /*no*/

}
</style>
