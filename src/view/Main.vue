<template>
    <div class="main">
        <div class="header">
            <Header />
        </div>
        <div class="conten">
            <div class="conten-top">
                <el-row :gutter="10">
                    <el-col :span="3">
                        <dv-border-box-12 class="item">
                            <data-statistics-one />
                        </dv-border-box-12>
                    </el-col>
                    <el-col :span="6">
                        <dv-border-box-12 class="item">
                            <div class="test">地图数据</div>
                        </dv-border-box-12>
                    </el-col>
                    <el-col :span="6">
                        <dv-border-box-12 class="item">
                            <div class="test">任务目标</div>
                        </dv-border-box-12>
                    </el-col>
                    <el-col :span="5">
                        <dv-border-box-12 class="item">
                            <div class="test">任务分析</div>
                        </dv-border-box-12>
                    </el-col>
                    <el-col :span="4">
                        <dv-border-box-12 class="item">
                            <div class="test">数据排行</div>
                        </dv-border-box-12>
                    </el-col>
                </el-row>
            </div>
            <div class="conten-bottom">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <dv-border-box-12 >
                            <div class="test">数据统计</div>
                        </dv-border-box-12>
                    </el-col>
                    <el-col :span="12">
                        <dv-border-box-12 >
                            <div class="test">满意度统计</div>
                        </dv-border-box-12>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Main/header.vue'
import DataStatisticsOne from '@/components/Main/DataStatisticsOne.vue'
export default {
  components: {
    Header,
    DataStatisticsOne
  }
}
</script>

<style scoped>
.el-row,.el-col{
    height: 100%;
}
.main{
    background:#000 url('~@/assets/img/mainBG.png') no-repeat center center;
    /* background-position:; */
    background-size: contain;
    position: absolute;
    min-width: 1700px; /*no*/
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.main .item{
    position: relative;
    padding: 10px; /*no*/
    box-sizing: border-box;
}
.main .header{
    flex: 0 0 80px; /*no*/
    margin-bottom: 10px;
}
.main .conten{
    flex: 1 1 auto;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.main .conten .conten-top{
    flex: 0 0 40%;
    margin-bottom: 10px;
}
.main .conten .conten-bottom{
    flex: 1;
}
.col{
    height: 0px; /*no*/
}
.test{
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
