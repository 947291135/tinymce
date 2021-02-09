<template>
    <div class="RejectionRankingFive">
        <Title title='流程单驳回数量排行' class="title"/>
        <div class="conten">
          <dv-scroll-board class="TbaleMain" :config="config" style="width:100%;height:100%" />
        </div>
    </div>
</template>

<script>
import Title from '@/components/Main/title.vue'
export default {
  props: {
    list: {
      type: Array,
      default () {
        return [
          {
            name: '甲某某',
            department: '检验业务部',
            value: 53
          },
          {
            name: '乙某某',
            department: '技术质询部',
            value: 31
          },
          {
            name: '丙某某',
            department: '检验业务部',
            value: 28
          },
          {
            name: '丁某某',
            department: '行政财务部',
            value: 27
          },
          {
            name: '戊某某',
            department: '顺海公司',
            value: 22
          },
          {
            name: '己某某',
            department: '检验业务部',
            value: 11
          },
          {
            name: '庚某某',
            department: '检验业务部',
            value: 10
          },
          {
            name: '辛某某',
            department: '惠州业务部',
            value: 8
          },
          {
            name: '壬某某',
            department: '检验业务部',
            value: 8
          },
          {
            name: '癸某某',
            department: '检验业务部',
            value: 7
          }
        ]
      }
    }
  },
  computed: {
    config () {
      let obj = {
        header: ['姓名', '部门', '驳回次数'],
        data: [],
        index: true,
        columnWidth: [50],
        rowNum: 7, // 表格行数
        headerHeight: 35,
        headerBGC: '#0f1325', // 表头
        oddRowBGC: '#0f1325', // 奇数行
        evenRowBGC: '#171c33', // 偶数行
        align: ['center', 'center', 'center', 'center']
      }
      if (this.list && this.list.length > 0) {
        let data = this.list.map(item => {
          return [item.name, item.department, item.value]
        })
        obj.data = data
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
.RejectionRankingFive .conten{
  margin-top: 10px;/*no*/
  flex: 1 1 auto;
  overflow: hidden;
}
</style>
