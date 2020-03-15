<template>
  <div id="app" :class="sidebarshow?'hideSidebar':'showSidebar'">
    <div class="sidebar-container">
      <sidebar :show='sidebarshow'></sidebar>
    </div>
    <div class="app-wrapper">
      <div class="navbar">
        <i @click="sidebarClick" :class="['icon',sidebarshow?'el-icon-s-unfold':'el-icon-s-fold']"></i>
      </div>
      <div class="roter-content">
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar'
export default {
  name: 'App',
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
    sidebar
  }
}
</script>

<style scoped>
  body,html{
    margin: 0;
    padding: 0;
    border: 0;
  }
  #app{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .app-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    transition: all .3s
  }
  .hideSidebar .app-wrapper{
    margin-left: 54px
  }
  .showSidebar .app-wrapper{
    margin-left: 200px
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
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    height: 100%;
    background-color: #304156;
  }

</style>
