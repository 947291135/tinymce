<!-- 跨域测试页面 -->
<template>
    <div class="axios">
      <el-row>
        <el-form ref="form" :model="form" label-width="120px" size='mini' label-position='top'>
          <el-form-item label="XMLHttpRequest">
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="xml()">普通请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="xml('/api/proxy.php')">proxy请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="xmlJSONP('http://www.api.com/jsonp.php')" >jsonp请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="xml('http://www.api.com/CORS.php')">cors请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="test('http://www.api.com/CORS.php')">test</el-button>
            </el-col>

          </el-form-item>
          <el-form-item label="axios">
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="axios('http://www.api.com/index.php')">普通请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="axios('/api/proxy.php')">proxy请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" disabled>jsonp请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary"  @click="axios('http://www.api.com/CORS.php')">cors请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary"  @click="Blog('http://localhost/phpdemo/excel.php')">Blog文件流</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="JQ">
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="JQuery('http://www.api.com/index.php')">普通请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="JQuery('/api/proxy.php')">proxy请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="JQuery_Jsonp('http://www.api.com/jsonp.php')">jsonp请求</el-button>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary"  @click="JQuery('http://www.api.com/CORS.php')">cors请求</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="定位">
             <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="JQuery('https://restapi.amap.com/v3/geocode/regeo?key=cf52e631671d42bbba5d69bf33e69437&location=113.88927,+22.50791')">jq请求</el-button>
            </el-col>
             <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
              <el-button type="primary" @click="axios('https://restapi.amap.com/v3/geocode/regeo?key=cf52e631671d42bbba5d69bf33e69437&location=113.88927,+22.50791')">axios请求</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  },
  mounted () {
    this.setToken('test', 'this is test cookie')
  },
  methods: {
    // XMLHttpRequest
    xml (url = process.env.API_ROOT, data = {test: '123'}) {
      var xhr = new XMLHttpRequest()
      // 使用HTTP POST请求与服务器交互数据
      xhr.open('POST', url, true)
      // // 设置发送数据的请求格式
      xhr.setRequestHeader('content-type', 'application/json')
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) { // 200 = OK
            console.log(JSON.parse(xhr.responseText))
          } else {
            alert('Problem retrieving XML data')
          }
        }
      }
      // 将用户输入值序列化成字符串
      xhr.send(JSON.stringify(data))
    },
    xmlJSONP (url = process.env.API_ROOT, data = {test: '123'}) {
      this.jsonp({
        url: url,
        data: data,
        success: function (obj) {
          console.log(obj)
        }
      })
    },
    jsonp (obj) {
      // 定义一个处理Jsonp返回数据的回调函数
      window['callback'] = function (object) {
        obj.success(object)
      }
      var script = document.createElement('script')
      // 组合请求URL
      script.src = obj.url + '?callback=callback'
      for (let key in obj.data) {
        script.src += '&' + key + '=' + obj.data[key]
      }
      // 将创建的新节点添加到BOM树上
      document.getElementsByTagName('body')[0].appendChild(script)
    },
    // axios
    axios (url = 'http://www.api.com/index.php', data = {test: '123'}) {
      this.$http.post(url, data).then(rel => {
        console.log(rel)
      }).catch(err => {
        console.log(err)
      })
    },
    Blog (url = 'http://localhost/phpdemo/excel.php') {
      this.$http.request({url, responseType: 'arraybuffer'}).then(rel => {
        let url = URL.createObjectURL(new Blob([rel]))
        let a = document.createElement('a')
        document.body.appendChild(a) // 此处增加了将创建的添加到body当中
        a.href = url
        a.download = 'test.xlsx'
        a.target = '_blank'
        a.click()
        a.remove() // 将a标签移除
      }).catch(err => {
        console.log(err)
      })
    },
    // JQ
    JQuery (url = 'http://www.api.com/index.php', data = {test: '123'}) {
      $.ajax({
        url: url,
        method: 'POST',
        data: data,
        dataType: 'json',
        success (rel) {
          console.log(rel)
        }
      })
    },
    JQuery_Jsonp (url = 'http://www.api.com/index.php', data = {test: '123'}) {
      $.ajax({
        url: url,
        method: 'POST',
        data: data,
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        success (rel) {
          console.log(rel)
        }
      })
    },
    // 加入cookie
    setToken (cname, cvalue, exdays = 30) {
      // 设置token
      return new Promise((resolve, reject) => {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toGMTString()
        document.cookie = cname + '=' + cvalue + '; ' + expires
        if (this.getToken(cname)) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    },
    getToken (cname) {
      // 获取token
      return new Promise((resolve, reject) => {
        var strcookie = document.cookie// 获取cookie字符串
        var arrcookie = strcookie.split('; ')// 分割
        // 遍历匹配
        for (var i = 0; i < arrcookie.length; i++) {
          var arr = arrcookie[i].split('=')
          if (arr[0] === cname) {
            resolve(arr[1])
            return
          }
        }
        /* eslint prefer-promise-reject-errors: "error" */
        reject(new Error('something bad happened'))
      })
    },
    test () {
      this.ajax().then(res => {
        return this.axios(res)
      }).then(res => {
        return this.axios(res)
      })
    },
    ajax (test = '123') {
      return this.$http.post('/api/proxy.php', {test: test})
    }
  }
}
</script>

<style scoped>
.axios{
    padding: 20px 20px 0 20px;
}
button{
  margin-bottom: 15px;
}
</style>
