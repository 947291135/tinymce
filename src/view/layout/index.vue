<template>
    <div class="app-wapper" :class="sidebarshow?'hideSidebar':'showSidebar'">
        <div class="sidebar-container">
            <sidebar :show='sidebarshow'></sidebar>
        </div>
        <div class="app-wrapper">
            <div class="navbar">
              <div class="navbarTop">
                <i @click="sidebarClick" :class="['icon',sidebarshow?'el-icon-s-unfold':'el-icon-s-fold']"></i>
              </div>
              <TagsView/>
            </div>
            <!-- <div class="app-tabs">
                <tabs></tabs>
            </div> -->
            <div class="roter-content">
              <transition name="fade-transform" mode="out-in">
                <router-view/>
              </transition>
            </div>
        </div>
    </div>
</template>

<script>
import sidebar from '@/components/sidebar'
import tabs from '@/components/tabs'
import TagsView from '@/view/layout/components/TagsView/index.vue'
export default {
  data () {
    return {
      // sidebarshow: true
    }
  },
  methods: {
    sidebarClick () {
      // this.sidebarshow = !this.sidebarshow
      this.$store.dispatch('app/sidebarOpen')
    }
  },
  computed: {
    sidebarshow () {
      return !this.$store.getters.sidebar.oppen
    }
  },
  components: {
    sidebar,
    tabs,
    TagsView
  }
}
</script>

<style scoped>
@media screen and (max-width: 640px) {
     .hideSidebar .sidebar-container{
       margin-left: -64px;/*no*/
     }
}
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
    flex: 0 0 64px;/*no*/
    transition: all .5s;
  }
  .app-wrapper .navbar{
    position: sticky;
    flex: 0 0 80px;/*no*/
    z-index: 1000;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);/*no*/
  }
  .app-wrapper .navbar .navbarTop{
    width: 100%;
    height: 50px;/*no*/
  }
  .app-wrapper .navbar .icon{
    line-height: 46px;/*no*/
    height: 100%;
    float: left;
    font-size: 21px;/*no*/
    cursor: pointer;
    transition: background .3s;
    padding: 0px 15px;/*no*/
    -webkit-tap-highlight-color: transparent;
  }
  .app-wrapper .roter-content{
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    position: relative;
  }
  .sidebar-container{
    flex: 0 0 200px;/*no*/
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

  .fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);/*no*/
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);/*no*/
}
</style>
