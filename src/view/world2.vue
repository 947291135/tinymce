<template>
    <div class="mian">
        <div class="iframestyleset">
            <iframe
              :style="{'height':iframeHeight}"
              name="iframeMap"
              id="iframeMapViewComponent"
              src="../../static/world/CCSISZ-01.htm"
              frameborder="0" scrolling="no" ref="iframeDom"
            ></iframe>
        </div>
        <div class="flex">
          <ul>
            <li @click="invokeHtmlMethod">第一</li>
            <li @click="click2">模板</li>
          </ul>
        </div>
    </div>
</template>

<script>
import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
export default {
  data () {
    return {
      info: {
        No: 'CCSISZ201259',
        VesselName: 'HZ 32-3', // 船    名
        Registry: '', // 船  籍  港
        ClassID: '', // 船级社/船舶登记号
        WorkingNo: 'SZJX0320089', // 工作控制号
        PlaceService: '惠 州', // 检 修 地 点
        DateService: '10th Oct. 2020', // 检 修 日 期
        NextInspection: '9th Oct. 2021'
      },
      Table: [
        {
          SerialNo: 'Y418789',
          Type: 'TC-13F-446-10MIN/MSA',
          CylNo: 'LT149031',
          Capacity: '2.50/517.',
          Press: '20.7/31.05',
          LastHydTestDate: '10/2020',
          WorkingCodes: '1,2,3,4,5,6,7,8,11'
        }
      ],
      TestingEquipment: [
        {
          name: 'Inflator for SCBA (空气充装机)',
          Model: 'AE2A',
          SerialNo: '13002'
        }
      ],
      iframeHeight: '100%'
    }
  },
  created () {
    // 初始化时为window绑定一个方法
    window['vueDefinedMyProp'] = (receiveParams) => {
      this.receiveParamsFromHtml(receiveParams)
    }
  },
  mounted () {
    console.log('test')
    setTimeout(() => {
      this.GetiframeHeight()
    }, 500)
  },
  methods: {
    GetiframeHeight () {
      let iframeDom = this.$refs.iframeDom
      if (iframeDom) {
        var bHeight = iframeDom.contentWindow.document.body.scrollHeight
        var dHeight = iframeDom.contentWindow.document.documentElement.scrollHeight
        var height = Math.min(bHeight, dHeight)
        this.iframeHeight = height + 'px'
      }
    },
    invokeHtmlMethod () {
      window.frames['iframeMap'].downloadsss()
    },
    click2 () {
      let data = {
        ...this.info,
        Table: this.Table
      }
      this.exportDocx('../../static/world/CCSISZ-01.docx', data, `脚本.docx`)
    },
    exportDocx (tempDocxPath, data, fileName) {
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(tempDocxPath, (error, content) => {
        if (error) {
          throw error
        }
        let zip = new PizZip(content)
        // eslint-disable-next-line new-cap
        let doc = new docxtemplater().loadZip(zip)
        doc.setData(data)
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render()
        } catch (error) {
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          }
          console.log({
            error: e
          })
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
          throw error
        }
        // 导出的文件虽然说是blob但是不能实际下载，需要先转Base64->File->下载
        let out = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }) // Output the document using Data-URI

        this.blobToFile(out, 'test.docx').then(res => {
          this.FileUpload(res, 'test.docx')
        })

        // 直接下载
        // let file = saveAs(out, fileName)
        // Base64->File->下载/上传
        // this.blobToBase64(out).then(res => {
        //   let blob = this.Base64ToFile(res, 'test.docx')
        //   const a = document.createElement('a')
        //   a.href = URL.createObjectURL(blob)
        //   a.download = 'test.docx' // 这里填保存成的文件名
        //   a.click()
        //   URL.revokeObjectURL(a.href)
        //   a.remove()
        // })
      })
    },
    // blob转Base64
    blobToBase64 (blob) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          resolve(e.target.result)
        }
        // readAsDataURL
        fileReader.readAsDataURL(blob)
        fileReader.onerror = () => {
          reject(new Error('文件流异常'))
        }
      })
    },
    // blob转File
    blobToFile (bolb, filename) {
      return new Promise((resolve, reject) => {
        try {
          let file = new File([bolb], filename)
          resolve(file)
        } catch (error) {
          reject(error)
        }
      })
    },
    // 将base64转换为文件对象
    Base64ToFileOrBlob (dataurl, filename, type = 'file') {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      // 转换成file对象
      if (type === 'file') return new File([u8arr], filename, {type: mime})
      // 转换成成blob对象
      if (type === 'blob') return new Blob([u8arr], {type: mime})
    },
    FileUpload (file, filename) {
      try {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(file)
        a.download = filename // 这里填保存成的文件名
        a.click()
        URL.revokeObjectURL(a.href)
        a.remove()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.mian{
    height: 100%;
    overflow: auto;
}
.iframestyleset{
    width: 1000px;
    min-width: 800px;/*no*/
    margin: 0 auto;
    /* height: 100%; */
}
.iframestyleset iframe{
  width: 100%;
  /* height: 100%; */
}
.flex{
    position: fixed;
    bottom:100px;/*no*/
    right: 80px;/*no*/
    width: 50px;/*no*/
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.flex ul{
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.flex ul li {
    flex: 1 1 50px;/*no*/
    text-align: center;
    width: 50px;/*no*/
    line-height: 50px;/*no*/
    align-items: center;
    justify-content: center;
    background: #49b1f5;
    margin-bottom: 5px;/*no*/
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    transition: all .5s;
}
.flex ul li:hover{
    background-color: #ff7242;
}
</style>
