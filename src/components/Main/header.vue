<template>
    <div class="Header">
        <div class="left">
            <div class="top">
                <dv-decoration-10 class="top-line"/>
                <dv-decoration-8 class="top-block" :color="['rgb(0, 194, 255)', 'rgba(0, 194, 255, 0.3)']"/>
            </div>
            <div class="bottom">
                <div class="bannerTitle">
                    数据1
                </div>
                <div class="bannerText">
                    <span class="text">
                        数据2
                    </span>
                </div>
            </div>
        </div>
        <div class="content">
            <p>大数据可视化平台</p>
            <dv-decoration-6 style="width:70%;height:10px;" />
        </div>
        <div class="right">
            <div class="top">
                <dv-decoration-8 class="top-block" :reverse="true" :color="['rgb(0, 194, 255)', 'rgba(0, 194, 255, 0.3)']"/>
                <dv-decoration-10 class="top-line" style="transform: rotateY(180deg);"/>
            </div>
            <div class="bottom">
                <div class="bannerText">
                    <span class="text">
                        数据3
                    </span>
                </div>
                <div class="bannerTitle">
                    {{date || ''}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {parseTime} from '@/assets/js/pubFormetter.js'
export default {
  data () {
    return {
      date: null,
      Time: null
    }
  },
  created () {
    this.getTime()
  },
  methods: {
    getTime () {
      this.Time = setInterval(() => {
        this.date = parseTime(Date.now())
      }, 1000)
    }
  },
  beforeDestroy () {
    if (this.Time) {
      clearInterval(this.Time)
      this.Time = null
    }
  }
}
</script>

<style scoped>
.Header{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: stretch;
    justify-content: space-between;
}
.Header>.left,.Header>.right{
    width: 45%;
    display: flex;
    align-items: stretch;
    flex-direction: column;
}
.Header>.left .top{
    margin-right: 100px;
}
.Header>.right .top{
    margin-left: 100px;
}
.Header .top{
    flex: 0 0 40px; /*no*/
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
    display: flex;
    padding-top: 20px;/*no*/
    box-sizing: border-box;
}
.Header .bottom{
    flex: 1;
    margin-top: 10px; /*no*/
    color: #fff;
    display: flex;
    align-items: stretch;
    justify-content: center;
    font-size: 14px; /*no*/
}
.Header .bottom div{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.Header .bottom .bannerText{
    flex: 0 0 300px;
    background: #125BDD;
}
.Header .bottom .bannerTitle{
    flex: 1 1 auto;
    padding: 0 20px;
    box-sizing: border-box;
}
.Header>.left .bottom div.bannerTitle{
    justify-content:flex-start;
    background: #0F1326;
}
.Header>.right .bottom div.bannerTitle{
    justify-content:flex-end;
    background: #0F1326;
}
.Header>.left .bottom div.bannerText{
    transform: skew(45deg);
}
.Header>.left .bottom div.bannerText .text{
    transform: skew(-45deg);
}
.Header>.left .bottom div.bannerText::after{
    content: '';
    position: absolute;
    left: -20px;/*no*/
    width: 20px;/*no*/
    height: 100%;
    background: #000;
}
.Header>.right .bottom div.bannerText{
    transform: skew(-45deg);
    z-index: 99;
}
.Header>.right .bottom div.bannerText .text{
    transform: skew(45deg);
}
.Header>.right .bottom div.bannerText::after{
    content: '';
    position: absolute;
    right: -20px;/*no*/
    width: 20px;/*no*/
    height: 100%;
    background: #000;
}
.Header>.left .bottom{
    margin-left: 20px;
}
.Header>.right .bottom{
    margin-right: 20px;
}
.top-line{
   width: 70%;
   height:8px;/*no*/
}
.top-block{
    width: 30%;
    height:25px;/*no*/
    padding-top: 3px;/*no*/
}
.Header>.content{
    flex:0 0 300px;/*no*/
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 24px; /*no*/
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
