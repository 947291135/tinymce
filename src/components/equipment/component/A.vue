<!--
 *@description:
 *@author: Ming
 *@date: 2021-05-08 11:19:21
 *@version: V1.0.5
-->
<template>
  <div>
      <el-input v-model="info" placeholder="请输入A" @input="Input"></el-input>
  </div>
</template>

<script>
import store from './store'
export default {
  methods: {
    Input (e) {
      store.setMessageAction(e)
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
