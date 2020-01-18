<template>
  <div class="tinymce">
    <textarea :id='tinymceID' class="tinymce" :style="{width:containerWidth}"></textarea>
  </div>
</template>

<script>
// import tinymce from 'tinymce/tinymce'
// import 'tinymce/themes/mobile/theme'
// import Editor from '@tinymce/tinymce-vue'
import load from '@/assets/js/dynamicLoadScript.js'
import Prism from 'prismjs'
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce@5.1.5/tinymce.min.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      tinymceID: this.id,
      tinymceHtml: null,
      textareaShow: false
    }
  },
  props: {
    id: {
      type: String,
      default: () => {
        return `vue-tinymce-${new Date().getTime() + (Math.random() * 1000).toFixed(0)}`
      }
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    content: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: 'http://localhost/index/test.php'
    }
  },
  activated () {
    if (window.tinymce) {
      this.inits()
    }
  },
  mounted () {
    let textareaBoolen = this.inits()
    this.textareaShow = textareaBoolen
    Prism.highlightAll()
  },
  methods: {
    inits () {
      load(tinymceCDN, (err) => {
        if (err) {
          console.log(err)
          return false
        }
        this.initTinmce()
        return true
      })
    },
    initTinmce () {
      let _this = this
      window.tinymce.init({
        selector: `#${this.tinymceID}`,
        language_url: '/static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        height: this.height,
        toolbar_drawer: 'sliding',
        plugins: 'advlist autolink link image lists preview codesample print fullscreen charmap',
        toolbar1: 'undo redo | styleselect removeformat | bullist numlist | fontselect | fontsizeselect | link image codesample | fullscreen',
        fontsize_formats: '12px 14px 16px 18px 20px 24px 28px 30px 36px 48px',
        setup: (editor) => {
          editor.on('keyup SetContent NodeChange Change', (e) => {
            this.tinymceHtml = editor.getContent()
          })
        },
        codesample_languages: [
          {text: 'HTML/XML', value: 'markup line-numbers'},
          {text: 'JavaScript', value: 'javascript line-numbers '},
          {text: 'CSS', value: 'css line-numbers'},
          {text: 'PHP', value: 'php line-numbers'}
        ],
        images_upload_handler: function (blobInfo, succFun, failFun) {
          var xhr, formData
          var file = blobInfo.blob()// 转化为易于理解的file对象
          xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', _this.url)
          xhr.onload = function () {
            var json
            if (xhr.status !== 200) {
              failFun('HTTP Error: ' + xhr.status)
              return
            }
            json = JSON.parse(xhr.responseText)
            if (!json || typeof json.location !== 'string') {
              failFun('Invalid JSON:' + xhr.responseText)
              return
            }
            succFun(json.location)
          }
          formData = new FormData()
          formData.append('file', file, file.name)// 此处与源文档不一样
          xhr.send(formData)
        }
      })
    }
  },
  computed: {
    containerWidth () {
      const width = this.width
      if (/^[/d]+(\.[/d]+)?$/.test(width)) {
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    tinymceHtml (news, old) {
      this.$emit('update:content', news)
      this.$nextTick(() => {
        Prism.highlightAll()
      })
    }
  }
}
</script>

<style scoped>
</style>
