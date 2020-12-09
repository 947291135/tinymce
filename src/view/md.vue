<template>
    <div v-html="text" v-highlight :key="key"></div>
</template>

<script>
import showdown from 'showdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
import readme from '@/assets/md/test.md'
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
      let str = 'test2.md'
      await import('@/assets/md/' + str).then(myModule => {
        let converter = new showdown.Converter()
        let text = this.HTMLDecode(myModule)
        let html = converter.makeHtml(myModule)
        this.text = html
      })
      this.key += 1
    },
    HTMLDecode (text) {
      var temp = document.createElement('div')
      temp.innerHTML = text
      var output = temp.innerText || temp.textContent
      temp = null
      return output
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

</style>
