<template>
    <div :class="['element',{oppen:sidebarshow}]">
      <el-form ref="form" label-width="80px" label-position="top">
        <el-form-item label="三级联动">
          <el-cascader
              size="large"
              :options="options"
              filterable
              v-model="selectedOptions"
              @change="addressChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="可编辑表格"  label-width="120px">
          <Tables />
        </el-form-item>
      </el-form>
      {{this.$store.getters.test}}
    </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import Tables from '@/components/table.vue'
export default {
  components: {
    Tables
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
    padding: 20px 20px 0 20px;
    overflow: hidden;
    box-sizing: border-box;
    transition: all .5s;
    width: calc(100vw - 64px);
}
.element.oppen{
  width: calc(100vw - 200px);
}
.element >>> .el-card__header{
  padding: 5px 10px;
}
</style>
