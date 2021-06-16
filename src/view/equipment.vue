<template>
  <div class="equipment">
      <A></A>
      <B></B>
      <h1>123</h1>
  </div>
</template>

<script>
import { Button, ButtonGroup } from 'lemon-test-1-2'
import 'lemon-test-1-2/dist/index.css'
import A from '@/components/equipment/component/A.vue'
import B from '@/components/equipment/component/B.vue'
export default {
  components: {
    Button,
    ButtonGroup,
    A,
    B
  }
}
</script>

<style lang="scss" scoped>
.equipment{
    width: 90%;
    margin: 0 auto;
    padding: 10px 20px;
    h1{
      color: red;
    }
}
</style>
