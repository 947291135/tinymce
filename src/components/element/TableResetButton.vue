
<!--重置表格列，按钮功能-->
<template>
    <el-popover
        popper-class="TablePopover"
        placement="bottom"
        trigger="click">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-divider></el-divider>
        <el-checkbox-group v-model="showLise"  @change="handleCheckedCitiesChange">
          <el-scrollbar :style="{height:'150px'}">
            <el-checkbox :label="key" v-for="(value,key,index) of keyMap" :key="index">{{value}}</el-checkbox>
          </el-scrollbar>
        </el-checkbox-group>
        <el-divider></el-divider>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="primary" @click="visible = false">导出Excel</el-button>
        </div>
        <el-button  icon="el-icon-s-operation" size="mini" type="primary" slot="reference"></el-button>
    </el-popover>
</template>

<script>
export default {
  data () {
    return {
      // 全选按钮状态
      checkAll: false,
      // 全选按钮半选不确定状态
      isIndeterminate: false
      // // 选中显示列表
      // showLise: [],
    }
  },
  model: {
    prop: 'list',
    event: 'change'
  },
  props: {
    list: {
      type: Object,
      default () {
        return {}
      }
    },
    keyMap: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleCheckAllChange (e) {
      this.showLise = e ? Object.keys(this.keyMap) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === Object.keys(this.keyMap).length
      this.isIndeterminate = checkedCount > 0 && checkedCount < Object.keys(this.keyMap).length
    }
  },
  // watch: {
  //   showLise (newValue) {
  //     this.$emit('change', JSON.parse(JSON.stringify(this.keyMap, newValue)))
  //   }
  // },
  computed: {
    showLise: {
      get () {
        let list = []
        for (const key in this.list) {
          list.push(key)
        }
        return list
      },
      set (e) {
        this.$emit('change', JSON.parse(JSON.stringify(this.keyMap, e)))
      }
    }
  }
}
</script>

<style scoped>
>>>.circle{
  padding: 5px;
}
</style>

<style>
.el-popover.TablePopover{
  display: flex;
  flex-direction: column;
}
.el-popover.TablePopover .el-divider{
  margin: 10px 0;
}
.el-popover.TablePopover .el-checkbox-group{
  display: flex;
  flex-direction: column;
  max-height: 150px;/*no*/
  overflow-y: auto;
}
.el-popover.TablePopover .el-checkbox-group .el-scrollbar__view{
  display: flex;
  flex-direction: column;
}
.el-popover.TablePopover .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>
