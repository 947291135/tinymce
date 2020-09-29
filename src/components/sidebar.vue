<template>
    <div class="sidebar">
        <el-menu class="el-menu-vertical-demo" :collapse="show" background-color="#304156" text-color="#BFCBD9" :router='true'  :default-active="activeMenu">
            <template v-for="(item , index) of this.munlist">
                <el-menu-item :key="index" :index="item.path" v-if="item.children.length<=1">
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
      munlist: []
    }
  },
  props: {
    show: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  created () {
    this.munlist = this.$router.options.routes
  },
  computed: {
    activeMenu () {
      const route = this.$route
      const {path, meta} = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px; /*no*/
    min-height: 400px;/*no*/
}
.el-menu {
    border: none
}
</style>
