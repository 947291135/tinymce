<template>
    <div class="element">
        <el-cascader
            size="large"
            :options="options"
            filterable
            v-model="selectedOptions"
            @change="addressChange">
        </el-cascader>
    </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data () {
    return {
      options: regionData,
      selectedOptions: null
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
    box-sizing: border-box;
}
</style>
