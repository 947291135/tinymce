<!--
  功能：图片子项
  作者：Ming
  时间：2021年03月16日 15:27:39
  修改内容：
  修改人员：
  修改时间：
-->
<template>
    <el-card :body-style="{ padding: '0px' }">
      <img :src="info.dataUrl" class="image">
      <div style="padding: 14px;">
        <span>图片备注：{{info.remarks || "暂无"}}</span>
        <div class="bottom clearfix">
          <time class="time">创建时间{{ info.createdDt }}</time>
        </div>
      </div>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      currentDate: new Date()
    }
  },
  props: {
    info: {
      type: Object,
      default() {
        return {
          dataUrl: '',
          remarks: '暂无'
        }
      }
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {
  },
  methods: {}
}
</script>

<style scoped>
.time {
font-size: 13px;
color: #999;
}

.bottom {
margin-top: 13px;
line-height: 12px;
}

.button {
padding: 0;
float: right;
}

.image {
width: 100%;
display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
