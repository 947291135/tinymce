<!--方案1 原生RTC调用摄像头+zxing识别库-->
<template>
    <div class="code">
        <video id='video' res='video'></video>
        <canvas id="canvas" res='canvas'></canvas>
        <img id="image" src="" alt="">
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
          // width: { min: 1920 },
          // height: { min: 1080 }
        }
        // mediaOpts.facingMode = { exact: 'environment' }
        this.getUserMedia(mediaOpts)
      }).catch(err => {
        console.log(err)
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
          console.log(err)
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
.code{position: relative;}
#video{
        margin: 0;
        padding: 0;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 9999;
        width: 100vw;
        height:  calc(100vh - 85px); /*no*/
        object-fit: cover;
    }
</style>
