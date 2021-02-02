<template>
  <div class="md">
    <div class="content" v-html="text" v-highlight :key="key"></div>
  </div>

</template>

<script>
import showdown from 'showdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
export default {
  data () {
    return {
      text: '',
      // 为了让组件强制渲染
      key: 0
    }
  },
  mounted () {
    this.getMd()
  },
  methods: {
    async getMd () {
      let str = 'JavaScript跨域方式.md'
      await import('@/assets/md/' + str).then(myModule => {
        let converter = new showdown.Converter()
        let text = this.HTMLDecode(myModule)
        let html = converter.makeHtml(myModule)
        this.text = this.html_decode(html)
        // this.text = text
      })
      this.key += 1
    },
    HTMLDecode (text) {
      var temp = document.createElement('div')
      temp.innerHTML = text
      var output = temp.innerText || temp.textContent
      temp = null
      return output
    },
    html_decode (str) {
      var s = ''
      if (str.length == 0) return ''
      s = str.replace(/&amp;/g, '&')
      s = s.replace(/&lt;/g, '<')
      s = s.replace(/&gt;/g, '>')
      s = s.replace(/&nbsp;/g, ' ')
      s = s.replace(/&#39;/g, "\'")
      s = s.replace(/&quot;/g, '"')
      s = s.replace(/<br\/>/g, '\n')
      return s
    }
  },
  directives: {
    highlight: {
      inserted (el) {
        let blocks = el.querySelectorAll('pre code')
        blocks.forEach((block) => {
          hljs.highlightBlock(block)
        })
      }
    }
  }
}
</script>

<style scoped>
.md{
  padding: 50px;
}
.md .content >>> blockquote{
  margin: 0 0 20px;
  padding: 2px 16px;
  border-left: 6px solid #49b1f5;
  background-color: #e9f5fe;
  color: #6a737d
}
.md .content >>> blockquote p{
  font-size: 14px;
}
.md .content >>> blockquote img{
  width: 100%;
}
.md .content >>> h1,.md .content >>> h2{
    position: relative;
    margin: 20px 0 8px;
    color: #344c67;
    font-weight: bold;
}
.md .content >>> pre code{
  background-color: #263238;
  color: #eff;
  line-height: 24px;/*no*/
  font-size: 14px;/*no*/

}
.md .content >>> pre code span.hljs-attr{
  color: #eff;
}
.md .content >>> pre code span.hljs-type, .md .content >>> pre code span.hljs-string, .md .content >>> pre code span.hljs-number, .md .content >>> pre code span.hljs-selector-id, .md .content >>> pre code span.hljs-selector-class, .md .content >>> pre code span.hljs-quote, .md .content >>> pre code span.hljs-template-tag, .md .content >>> pre code span.hljs-deletion{
  color: #c3e88d;
}
.md .content >>> pre code span.hljs-title, .md .content >>> pre code span.hljs-section{
  color: #89ddff;
}
.md .content >>> pre code span.hljs-built_in, .md .content >>> pre code span.hljs-bullet, .md .content >>> pre code span.hljs-code, .md .content >>> pre code span.hljs-addition {
    color: #ffcb6b;
}
</style>
