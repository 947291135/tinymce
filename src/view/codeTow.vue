<template>
    <div class="code">
        <video id='video' res='video'></video>
        <div class="animation">
            <div class="line">
                <i class="lineShow"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { BrowserMultiFormatReader } from '@zxing/library'
export default {
  data () {
    return {
      codeReader: new BrowserMultiFormatReader(),
      tipMsg: null
    }
  },
  created () {
    this.openScan()
  },
  methods: {
    openScan () {
      this.codeReader.getVideoInputDevices()
        .then((videoInputDevices) => {
          // 设置默认摄像头，为第一个摄像头
          let firstDeviceId = videoInputDevices[0].deviceId
          var videoInputDeviceslablestr = JSON.stringify(videoInputDevices[0].label)
          if (videoInputDevices.length > 1) {
            // 判断是否后置摄像头
            if (videoInputDeviceslablestr.indexOf('back') > -1) {
              firstDeviceId = videoInputDevices[0].deviceId
            } else {
              firstDeviceId = videoInputDevices[1].deviceId
            }
          }
          this.decodeFromInputVideoFunc(firstDeviceId)
        }).catch((err) => {
          console.error(err, '获取设备失败')
        })
    },
    // 调用相机
    decodeFromInputVideoFunc (deviceId) {
      console.log(this.codeReader)
      if (!deviceId) return
      this.codeReader.decodeFromInputVideoDeviceContinuously(deviceId, 'video', (result, err) => {
        if (result) {
          // 识别成功
          console.log(result.text)
          this.codeReader.reset()
          this.codeReader = null
        }
        // if (err) {
        //   console.log(err, '识别失败')
        // }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.code{position: relative;background: #000; width: 100%; height:  calc(100vh - 85px); /*no*/}
#video{
    margin: 0;
    padding: 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 998;
    width: 100vw;
    height:  calc(100vh - 85px); /*no*/
    object-fit: cover;
}
.animation{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-345px,-355px);
    z-index: 999;
    width: 690px;
    height: 450px;
    /* background: rgba(0,0,0,.5); */
}
.animation .line{
    position: absolute;
    top: -100%;
    width: 100%;
    height: 40px;
    /* background: rgba(255,255,255,.5); */
    overflow: hidden;
    animation: mymove 3s linear infinite;
}
.animation .line .lineShow{
    position: absolute;
    bottom: -345px;
    left: -200px;
    display: inline-block;
    width: 1090px;
    height: 345px;
    border-radius: 50%;
    background: burlywood;
    z-index: 9999;
    background: red;
    box-shadow:0px -5px 30px 10px #07b45a;
}
@keyframes mymove
{
0% {top:-10%;opacity: 0;}
10% {opacity: 1;}
80%{opacity: .8;}
100% {top:100%;opacity: 0;}
}

</style>
