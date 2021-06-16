<!--
 *@description:
 *@author: Ming
 *@date: 2021-05-08 11:20:25
 *@version: V1.0.5
-->
<template>
  <div>
      <el-input :value="info" placeholder="请输入B"></el-input>
  </div>
</template>

<script>
import store from './store'
export default {
  data () {
    return {
    //   info: store.state.message
    }
  },
  computed: {
    info () {
      let value = store.state.message
      return value
    }
  }
}
</script>

<style scoped>

</style>
