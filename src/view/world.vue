<template>
    <div class="mian">
        <!-- <div class="iframestyleset">
            <iframe
              :style="{'height':iframeHeight}"
              name="iframeMap"
              id="iframeMapViewComponent"
              src="../../static/world/CCSISZ-01.htm"
              frameborder="0" scrolling="no" ref="iframeDom"
            ></iframe>
        </div> -->
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择性别" style="width:100%">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
                <el-option label="未知" value="未知" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="出生年月" prop="date">
              <el-date-picker
               style="width:100%"
                v-model="form.date"
                type="date"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                placeholder="选择出生年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="政治面貌" prop="politics">
              <el-radio-group v-model="form.politics"  size="small">
                <el-radio-button label="党员"></el-radio-button>
                <el-radio-button label="群众"></el-radio-button>
                <el-radio-button label="其他"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="毕业学校" prop="graduationSchool">
              <el-input v-model="form.graduationSchool" placeholder="请输入毕业学校"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="毕业时间" prop="graduationTime">
              <el-date-picker
               style="width:100%"
                v-model="form.graduationTime"
                type="date"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                placeholder="选择毕业时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="身份证号" prop="No">
              <el-input v-model="form.No" placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="专业" prop="major">
              <el-input v-model="form.major" placeholder="请输入专业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="住址" prop="address">
              <el-input v-model="form.address" placeholder="请输入住址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="邮政编码" prop="postalCode">
              <el-input v-model="form.postalCode" placeholder="请输入邮政编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="户籍" prop="registry">
              <el-input v-model="form.registry" placeholder="请输入户籍"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="籍贯" prop="nativePlace">
              <el-input v-model="form.nativePlace" placeholder="请输入籍贯"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="身体状况" prop="state">
              <el-radio-group v-model="form.state"  size="small">
                <el-radio-button label="健康"></el-radio-button>
                <el-radio-button label="良好"></el-radio-button>
                <el-radio-button label="较差"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="工作单位" prop="workUnit">
              <el-input v-model="form.workUnit" placeholder="请输入工作单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="education" label-width="0px">
              <educationTable :list="form.education"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="workList" label-width="0px">
              <workListTable :list="form.workList"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="projectList" label-width="0px">
              <projectListTable :list="form.projectList"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="footer">
        <el-button size="small" @click="resetForm">重置</el-button>
        <el-button size="small" type="primary" @click="click2">导出</el-button>
      </div>
      <!-- <div class="flex">
        <ul>
          <li @click="invokeHtmlMethod">第一</li>
          <li @click="click2">模板</li>
        </ul>
      </div> -->
    </div>
</template>

<script>
import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import {FileUpload} from '@/assets/js/FileTypeTrans.js'
import educationTable from '@/components/world/educationTable.vue'
import workListTable from '@/components/world/workListTable.vue'
import projectListTable from '@/components/world/projectListTable.vue'
export default {
  data () {
    return {
      form: {
        name: null, // 姓名
        sex: null, // 性别
        date: new Date().toLocaleDateString(), // 出生年月
        politics: '群众', // 政治背景
        graduationSchool: null, // 毕业学校
        graduationTime: null, // 毕业时间
        No: null, // 身份证号码
        major: null, // 专业
        address: null, // 住址
        postalCode: null, // 邮政编码
        phone: null, // 联系电话
        registry: null, // 户籍
        nativePlace: null, // 籍贯
        state: '健康', // 身体状况
        workUnit: null, // 工作单位
        education: [], // 教育经历
        workList: [], // 工作经历
        projectList: [], // 项目经历
        achievement: null, // 业绩
        reason: null, // 应聘岗位、理由及其他需要说明
        remarks: null
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
  },
  mounted () {
    // setTimeout(() => {
    //   this.GetiframeHeight()
    // }, 500)
  },
  methods: {
    // 重置表单方法
    resetForm () {
      this.$refs.form.resetFields()
    },
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
      this.exportDocx('/static/world/world.docx', this.form, `个人简历.docx`)
    },
    exportDocx (tempDocxPath, data, fileName) {
      // 读取并获得模板文件的二进制内容
      console.log(tempDocxPath)
      JSZipUtils.getBinaryContent(tempDocxPath, (error, content) => {
        console.log(tempDocxPath, data, fileName, error, content)
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
        //  移动端不支持
        // this.blobToFile(out, 'test.docx').then(res => {
        //   this.FileUpload(res, 'test.docx')
        // })

        // 直接下载
        saveAs(out, fileName)
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
  },
  components: {
    educationTable,
    workListTable,
    projectListTable
  }
}
</script>

<style scoped>
.mian{
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    position: relative;
}
.mian .form{
  padding: 20px 50px 0;
}
.mian .footer{
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px; /*no*/
  background-color: #fff;
  box-shadow:0 -2px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%); /*no*/
  z-index: 999;
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
