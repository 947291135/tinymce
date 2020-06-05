<template>
    <div class="app-wapper" :class="sidebarshow?'hideSidebar':'showSidebar'">
        <div class="sidebar-container">
            <sidebar :show='sidebarshow'></sidebar>
        </div>
        <div class="app-wrapper">
            <div class="navbar">
                <i @click="sidebarClick" :class="['icon',sidebarshow?'el-icon-s-unfold':'el-icon-s-fold']"></i>
            </div>
            <div class="app-tabs">
                <tabs></tabs>
            </div>
            <!-- <div class="roter-content">
                <router-view/>
            </div> -->
        </div>
    </div>
</template>

<script>
import sidebar from '@/components/sidebar'
import tabs from '@/components/tabs'
export default {
  data () {
    return {
      sidebarshow: true
    }
  },
  methods: {
    sidebarClick () {
      this.sidebarshow = !this.sidebarshow
    }
  },
  components: {
    sidebar,
    tabs
  }
}
</script>

<style scoped>
  .app-wapper{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    transition: all .3s
  }
  .hideSidebar .sidebar-container{
    flex: 0 0 64px;
  }
  .app-wrapper .navbar{
    flex: 0 0 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
  .app-wrapper .navbar .icon{
    line-height: 46px;
    height: 100%;
    float: left;
    font-size: 21px;
    cursor: pointer;
    transition: background .3s;
    padding: 0px 15px;
    -webkit-tap-highlight-color: transparent;
  }
  .app-wrapper .roter-content{
    flex: 1;
    position: relative;
  }
  .sidebar-container{
    flex: 0 0 200px;
    z-index: 1001;
    overflow: hidden;
    height: 100%;
    background-color: #304156;
    transition: all .5s;
  }
  .app-wrapper{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .app-tabs{
    flex: 1 1 auto;
  }
  .app-tabs>>>.router-tab{
    height: 100%;
  }
</style>
