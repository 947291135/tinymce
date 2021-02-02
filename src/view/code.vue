<!--方案1 原生RTC调用摄像头+zxing识别库-->
<template>
    <div class="code">
        <video id='video' res='video'></video>
        <canvas id="canvas" res='canvas'></canvas>
        <img id="image" src="" alt="" style="" v-show='false'>
        <div class="animation">
            <div class="line">
                <i class="lineShow"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { BrowserQRCodeReader } from '@zxing/library'
export default {
  data () {
    return {
      BrowserQRCodeReader,
      // 当前手机录像设备列表
      exArray: [],
      codeReader: null
    }
  },
  created () {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          if (device.kind === 'videoinput') {
            this.exArray.push(device.deviceId)
          }
        })
        var mediaOpts = {
          width: { min: 1920 },
          height: { min: 1080 }
        }
        mediaOpts.facingMode = { exact: 'environment' }
        this.getUserMedia(mediaOpts)
      }).catch(err => {
        alert(err)
      })
  },
  methods: {
    getUserMedia (constraints) {
      // eslint-disable-next-line standard/object-curly-even-spacing
      constraints = constraints || { width: 90, height: 120}
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
      if (getUserMedia) {
        navigator.getUserMedia({
          // audio: true,
          video: constraints
        }, (stream) => {
          var video = document.querySelector('video')
          let src
          try {
            src = stream
            video.srcObject = src
          } catch (error) {
            src = window.URL.createObjectURL(stream)
          }
          video.onloadedmetadata = function (e) {
            video.play()
          }
          setTimeout(() => {
            this.screenShot()
          }, 2000)
        }, (err) => {
          alert(err)
          // document.body.innerHTML+=err
        })
      }
    },
    // 图片生成
    screenShot () {
      var canvas = document.getElementById('canvas')
      var context = canvas.getContext('2d')
      var video = document.getElementById('video')
      let height = document.getElementById('video').offsetHeight
      let width = document.getElementById('video').offsetWidth
      canvas.setAttribute('width', width)
      canvas.setAttribute('height', height)
      context.drawImage(video, 0, 0, width, height)
      let base64 = canvas.toDataURL('image/png')
      let img = document.getElementById('image')
      img.src = base64
      this.decodeQrcode()
    },
    decodeQrcode (base64) {
      const codeReader = new BrowserQRCodeReader()
      let img = document.getElementById('image')
      codeReader.decodeFromImage(undefined, img.src).then(res => {
        alert(res)
      }).catch(err => {
        if (err) {
          setTimeout(() => {
            this.screenShot()
          }, 2000)
        }
      })
    //   try {
    //     let res = await codeReader.decodeFromImage(undefined, img.src)

    //     if (res) {
    //       alert(res)
    //     }
    //   } catch (error) {
    //     if (error) {
    //       console.log(error)
    //       this.screenShot()
    //     }
    //   }
    }
  }
}
</script>

<style scoped>
.code{
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: hidden;
  background: #000;
}
#video{
        margin: 0;
        padding: 0;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 99;
        width: 100vw;
        height:  calc(100vh - 85px); /*no*/
        object-fit: cover;
    }
    image{
      overflow: hidden;
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
