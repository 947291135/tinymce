<!--
 *@description:
 *@author: Ming
 *@date: 2021-11-14 11:33:14
 *@version: V1.0.5
-->
<template>
  <div class="print">
      <el-button type="primary" @click="print">执行打印操作</el-button>
  </div>
</template>

<script>
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  props: {

  },
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    print () {
      console.log('print')
      this.pdf()
    },
    pdf (title = '测试') {
      var target = document.getElementsByClassName('roter-content')[0]
      html2Canvas(target, {
        allowTaint: true, // 允许跨域图片
        taintTest: false, // 是否在渲染前测试图片
        useCORS: true, // （图片跨域相关)
        removeContainer: false,
        // foreignObjectRendering: true,
        height: target.scrollHeight,
        scale: 2,
        dpi: 192,
        background: '#fff',
        windowHeight: target.scrollHeight
      }).then((canvas) => {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 595.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        // this.saveFile(pageData.replace('image/jpeg', 'image/octet-stream'), new Date().getTime() + '.jpeg')
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }

        PDF.save(title + '.pdf')
      })
    }
  }
}
</script>

<style scoped>

</style>
