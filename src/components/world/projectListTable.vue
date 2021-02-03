<template>
    <el-card class="box-card card">
        <div slot="header" class="clearfix">
            <span style="font-size: 14px;">项目经历</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="add">增加</el-button>
        </div>
        <div class="content">
            <el-table
                :data="list"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                align="center"
                label="起止时间"
                min-width="120">
                    <template slot-scope="scope">
                        <el-input v-if='scope.row.isdate' v-model="scope.row.date" @focus="focusEvent(scope.row,'date')" @blur="blurEvent(scope.row,'date')" v-focus></el-input>
                        <p @click="cellClick(scope.row,'date')" v-else>{{scope.row.date}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                prop="name"
                align="center"
                label="项目名称"
                min-width="180">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.isname" v-model="scope.row.name" @focus="focusEvent(scope.row,'name')" @blur="blurEvent(scope.row,'name')" v-focus></el-input>
                        <p @click="cellClick(scope.row,'name')" v-else>{{scope.row.name}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                prop="remarks"
                align="center"
                label="项目名称"
                min-width="180">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.isremarks" v-model="scope.row.remarks" @focus="focusEvent(scope.row,'remarks')" @blur="blurEvent(scope.row,'remarks')" v-focus></el-input>
                        <p @click="cellClick(scope.row,'remarks')" v-else>{{scope.row.remarks}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作"
                    fixed="right"
                    width="90">
                    <template slot-scope="scope">
                        <el-button @click="Delete(scope.$index)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return [
          {
            date: null,
            isdate: false,
            name: null,
            isname: false,
            remarks: null,
            isremarks: false
          }
        ]
      }
    }
  },
  methods: {
    add () {
      this.list.push({
        date: null,
        isdate: null,
        name: null,
        isname: null
      })
    },
    Delete (index) {
      this.list.splice(index, 1)
    },
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
.card >>> .el-card__header{
    padding: 0 10px;/*no*/
}
.card >>> .el-card__header .clearfix{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card >>> .el-table thead .cell{
    padding: 10px 0;/*no*/
    text-align: center;
}
.card >>> .el-table tbody .cell{
    padding: 0;
    height: 40px;/*no*/
    display: flex;
    align-items: center;
    justify-content: center;
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
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: inline-block;

    padding: 8px 8px;/*no*/
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
