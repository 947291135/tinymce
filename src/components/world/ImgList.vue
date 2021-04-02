<!--
  功能：图片列表
  作者：Ming
  时间：2021年03月16日 15:19:45
  修改内容：
  修改人员：
  修改时间：
-->
<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="font-size: 14px;">{{title}}</span>
            <slot name="title"/>
        </div>
        <el-row :gutter="20">
            <template v-for="(item,index) of data" >
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(items,indexs) of item" :key="index+'-'+indexs" style="margin-bottom:10px">
                    <img-item :info="items"/>
                </el-col>
            </template>
        </el-row>
    </el-card>
</template>

<script>
import ImgItem from '@/components/world/ImgItem.vue'
export default {
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default () {
        return '8.现场图片'
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    ImgItem
  },
  computed: {},
  watch: {},
  created () {
  },
  methods: {}
}
</script>

<style scoped>

</style>
