<template>
    <div :class="['element',{oppen:sidebarshow}]">
      <el-form ref="form" label-width="80px" label-position="top">
        <el-form-item label="打印页面">
          <Print />
        </el-form-item>
        <el-form-item label="三级联动">
          <el-cascader
              size="large"
              :options="options"
              filterable
              v-model="selectedOptions"
              @change="addressChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <Tables />
      <Execl/>
      <!-- <p class="test">{{this.$store.getters.test}}</p> -->
      <testTables style="margin-top:15px"/>
    </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import Tables from '@/components/element/table.vue'
import Execl from '@/components/element/execl.vue'
import testTables from '@/components/element/testTable.vue'
import Print from '@/components/element/print.vue'
export default {
  components: {
    Tables,
    Execl,
    testTables,
    Print
  },
  data () {
    return {
      options: regionData,
      selectedOptions: null
    }
  },
  computed: {
    sidebarshow () {
      return this.$store.getters.sidebar.oppen
    }
  },
  methods: {
    addressChange (arr) {
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]])
    }
  }
}
</script>

<style scoped>
.element{
    padding: 20px 20px 0 20px;/*no*/
    overflow: hidden;
    box-sizing: border-box;
    transition: all .5s;
    width: 100%; /*no*/
    min-width:250px;/*no*/
}
.element.oppen{
  width: calc(100vw - 200px); /*no*/
  min-width:250px;/*no*/
}
.element >>> .el-card__header{
  padding: 10px 10px;/*no*/
}
.test{
  display: inline-block;
  width: 150px;
  font-size: 25px;
}
</style>
