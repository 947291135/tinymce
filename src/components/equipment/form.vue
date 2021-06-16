<template>
  <div class="equipmentForm">
    <div class="header">
        <p>设备管理</p>
    </div>
    <el-card class="box-card">
        这里放表单
    </el-card>
    <div class="button">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small">刷新</el-button>
        <el-button type="primary" icon="el-icon-plus" size="small" style="float:right">添加设备</el-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.equipmentForm .header{
    width: 100%;
    height: 35px;/*no*/
    margin-bottom: 10px;
    line-height: 35px;/*no*/
    border-bottom: 1px solid #66c9f3; /*no*/
    position: relative;
}
.equipmentForm .header p{
    font-weight: bold;
    font-size: 14px;/*no*/
    border-bottom: solid 3px #66c9f3;/*no*/
    position: absolute;
    z-index: 100;
    margin: 0;
    left: 7px;/*no*/
    bottom: -1px;/*no*/
    padding: 0 3px;/*no*/
    height: 30px;/*no*/
    line-height: 30px;/*no*/
}
.box-card{
    margin-bottom: 10px;
}
.button{
    margin-bottom: 10px;
}
</style>
