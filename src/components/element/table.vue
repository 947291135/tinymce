<template>
    <el-card class="box-card card">
        <div slot="header" class="clearfix">
            <span style="font-size: 14px;">可编辑表格</span>
            <el-button style="float: right; padding: 3px 0" type="text">增加</el-button>
        </div>
        <div class="content">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                type="selection"
                min-width="55">
                </el-table-column>
                <el-table-column
                prop="step"
                align="center"
                label="作业步骤"
                show-overflow-tooltip
                min-width="100">
                    <template slot-scope="scope">
                        <el-input v-if='scope.row.isstep' v-model="scope.row.step" @focus="focusEvent(scope.row,'step')" @blur="blurEvent(scope.row,'step')" v-focus></el-input>
                        <p @click="cellClick(scope.row,'step')" v-else>{{scope.row.step}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                prop="hazards"
                align="center"
                label="确认的危害及潜在的影响"
                show-overflow-tooltip
                min-width="180">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.ishazards" v-model="scope.row.hazards" @focus="focusEvent(scope.row,'hazards')" @blur="blurEvent(scope.row,'hazards')" v-focus></el-input>
                        <p @click="cellClick(scope.row,'hazards')" v-else>{{scope.row.hazards}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="风险评估" align="center">
                    <el-table-column
                        prop="riskS"
                        align="center"
                        label="S"
                        show-overflow-tooltip
                        min-width="50">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.isriskS" v-model="scope.row.riskS" @focus="focusEvent(scope.row,'riskS')" @blur="blurEvent(scope.row,'riskS')" v-focus></el-input>
                            <p @click="cellClick(scope.row,'riskS')" v-else>{{scope.row.riskS}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="riskP"
                        align="center"
                        label="P"
                        show-overflow-tooltip
                        min-width="50">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.isriskS" v-model="scope.row.riskS" @focus="focusEvent(scope.row,'riskS')" @blur="blurEvent(scope.row,'riskS')" v-focus></el-input>
                            <p @click="cellClick(scope.row,'riskS')" v-else>{{scope.row.riskS}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="riskR"
                        align="center"
                        label="R"
                        show-overflow-tooltip
                        min-width="50">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.isriskS" v-model="scope.row.riskS" @focus="focusEvent(scope.row,'riskS')" @blur="blurEvent(scope.row,'riskS')" v-focus></el-input>
                            <p @click="cellClick(scope.row,'riskS')" v-else>{{scope.row.riskS}}</p>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                prop="measures"
                align="center"
                label="控制措施(包括现有的和建议的)"
                show-overflow-tooltip
                min-width="180">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.isriskS" v-model="scope.row.riskS" @focus="focusEvent(scope.row,'riskS')" @blur="blurEvent(scope.row,'riskS')" v-focus></el-input>
                        <p @click="cellClick(scope.row,'riskS')" v-else>{{scope.row.riskS}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                prop="charge"
                align="center"
                label="负责人"
                show-overflow-tooltip
                min-width="120">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.isriskS" v-model="scope.row.riskS" @focus="focusEvent(scope.row,'riskS')" @blur="blurEvent(scope.row,'riskS')" v-focus></el-input>
                        <p @click="cellClick(scope.row,'riskS')" v-else>{{scope.row.riskS}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="残余风险" show-overflow-tooltip align="center">
                    <el-table-column
                        prop="remnantS"
                        align="center"
                        label="S"
                        show-overflow-tooltip
                        min-width="50">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.isriskS" v-model="scope.row.riskS" @focus="focusEvent(scope.row,'riskS')" @blur="blurEvent(scope.row,'riskS')" v-focus></el-input>
                            <p @click="cellClick(scope.row,'riskS')" v-else>{{scope.row.riskS}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="remnantP"
                        align="center"
                        label="P"
                        show-overflow-tooltip
                        min-width="50">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.isriskS" v-model="scope.row.riskS" @focus="focusEvent(scope.row,'riskS')" @blur="blurEvent(scope.row,'riskS')" v-focus></el-input>
                            <p @click="cellClick(scope.row,'riskS')" v-else>{{scope.row.riskS}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="remnantR"
                        align="center"
                        label="R"
                        show-overflow-tooltip
                        min-width="50">
                        <template slot-scope="scope">
                            <el-input v-if="scope.row.isriskS" v-model="scope.row.riskS" @focus="focusEvent(scope.row,'riskS')" @blur="blurEvent(scope.row,'riskS')" v-focus></el-input>
                            <p @click="cellClick(scope.row,'riskS')" v-else>{{scope.row.riskS}}</p>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                prop="alarp"
                align="center"
                label="残余风险是否ALARP?"
                min-width="120">
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          step: '暂无',
          isstep: false,
          hazards: '暂无',
          ishazards: false,
          riskS: 0,
          isriskS: false,
          riskP: 0,
          isriskP: false,
          riskR: 0,
          isriskR: false,
          measures: '暂无',
          ismeasures: false,
          charge: '暂无',
          ischarge: false,
          remnantS: 0,
          isremnantS: false,
          remnantP: 0,
          isremnantP: false,
          remnantR: 0,
          isremnantR: false,
          alarp: '暂无',
          isalarp: false
        }
      ]
    }
  },
  methods: {
    // 下面时表格事件
    focusEvent (row, type) {
      row[`old${type}`] = row[type]
    },
    blurEvent (row, type) {
      row['is' + type] = !row['is' + type]
      if (row[type] === '') {
        row[type] = '暂无'
      }
      if (row[type] !== row[`old${type}`]) {
        // 。。。此处代码省略（调用修改名称接口）
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      }
    },
    cellClick (row, type) {
      row[`is${type}`] = !row[`is${type}`]
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector('input').focus()
      }
    }
  }
}
</script>

<style scoped>
.card >>> .el-table .cell{
    padding: 0;
    text-align: center;
}
.card >>> .el-card__body{
    width: auto;
    padding: 0;
}
.card .content{
    margin: 0 auto;
}
.card >>> .el-table th{
    padding: 0;
}
.card >>> .el-table .cell p {
    margin: 0;
    padding: 8px 8px;
    white-space: nowrap;/*设置不换行*/
    overflow: hidden; /*设置隐藏*/
    text-overflow: ellipsis; /*设置隐藏部分为省略号*/
}
.card >>> .el-table td{
    padding: 0;
    text-align: center;
}
.card >>> .el-input__inner {
    border-radius: 0;
}
</style>
