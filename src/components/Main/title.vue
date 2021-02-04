<template>
    <div class="title">
        <i :class="['icon',iconfont]"></i>
        <div class="text">{{title}}</div>
        <div class="other">
         <slot name="decoration"/>
         <!-- 123456789456456456456 -->
        </div>
    </div>
</template>

<script>
export default {
  props: {
    iconfont: {
      type: String,
      default () {
        return 'el-icon-s-data'
      }
    },
    title: {
      type: String,
      default () {
        return '标题'
      }
    }
  }
}
</script>

<style scoped>
.title{
    position: relative;
    display: flex;
    color: #60c4CD;
    align-items: center;
    height: 20px;/*no*/
    margin-right: 20px;/*no*/
    font-size: 14px;/*no*/
}
.title .icon{
    flex:0 0 auto;
    padding: 0 5px;/*no*/
    font-size: 16px;/*no*/
}
.title .text{
    flex: 0 0 auto;
    font-size: 12px;/*no*/
    color: #bbd6d8;
    margin-right: 5px;/*no*/
}
.title .other {
    flex: 1 1 auto;
    height: 100%;
    overflow: hidden;
}
</style>
