<template>
  <div class="body">
    <div class="form">
      <el-form
        :model="form"
        size="small"
        label-width="80px"
        label-position="left"
        ref="Form"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :xl="8" :lg="8" :md="8" :sm="12" :xs="24">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="form.title" maxlength="10" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="8" :lg="8" :md="8" :sm="12" :xs="24">
            <el-form-item label="文章副题" prop="subtitle">
              <el-input v-model="form.subtitle" maxlength="30" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="8" :lg="8" :md="8" :sm="12" :xs="24">
            <el-form-item label="所属类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in ArticleList"
                  :key="item.type"
                  :label="item.label"
                  :value="item.type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="3" :lg="3" :md="3" :sm="12" :xs="12">
            <el-form-item label="显示">
              <el-switch v-model="form.show"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="3" :lg="3" :md="3" :sm="12" :xs="12">
            <el-form-item label="登陆可看">
              <el-switch v-model="form.vip"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="封面图片" prop="img">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                action="http://localhost/index/test.php"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="IMGchange"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="form.img" :src="form.img" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="3" :lg="3" :md="4" :sm="8" :xs="8">
            <el-button size="mini" type="primary" @click="post">
              上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-col>
          <el-col :xl="3" :lg="3" :md="4" :sm="8" :xs="8">
            <el-button size="mini" type="info">
              重置
              <i class="el-icon-delete el-icon--right"></i>
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div ref="tinymce" class="tinymce" >
      <tinymce v-if="tinymceSHOW" :content.sync="content" :height="tinymceHeight<=0?200:tinymceHeight"></tinymce>
    </div>
  </div>
</template>

<script>
import tinymce from '@/components/tinymce'
export default {
  data () {
    return {
      form: {
        title: null,
        subtitle: null,
        type: null,
        img: null, // 用于图片选择展示，不代表最终的图片url
        show: true,
        vip: false
      },
      imgFileSuccess: false, // 查看图片上传是否成功
      imgSuccessTime: 10, // 图片上传倒计时，10秒内上传不成功，则失败
      imageUrl: null, // 真正的上传成功的图片url 为null：代表已经选择，还未上传; 为url：已上传
      content: '', // 富文本内容
      tinymceHeight: 0,
      tinymceSHOW: true,
      ArticleList: [
        {
          type: 'php',
          label: 'PHP'
        },
        {
          type: 'html',
          label: 'HTML'
        },
        {
          type: 'javascript',
          label: 'JavaScript'
        },
        {
          type: 'vue',
          label: 'Vue'
        },
        {
          type: 'linux',
          label: 'Linux'
        }
      ],
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        subtitle: [
          { required: true, message: '副标题不能为空', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择文章所属', trigger: 'change' }
        ],
        img: [{ required: true, message: '请上传图片', trigger: 'change' }]
      }
    }
  },
  components: {
    tinymce
  },
  created () {
    this.height()
  },
  mounted () {
    this.tinymceSHOW = false
    window.onresize = () => {
      this.height()
    }
    setTimeout(() => {
      this.tinymceSHOW = true
    }, 50)
  },
  methods: {
    height () {
      this.$nextTick(() => {
        let tinymceDOM = this.$refs.tinymce && this.$refs.tinymce.getBoundingClientRect()
        console.log(tinymceDOM.height)
        this.tinymceHeight = tinymceDOM.height - 50
      })
    },
    handleAvatarSuccess (res, file) {
      // 图片上传成功
      this.imageUrl = res.location
    },
    beforeAvatarUpload (file) {
      // 上传前的文件监测
      console.log(123)
      return true
    },
    IMGchange (file, fileList) {
      // 选择图片
      this.form.img = URL.createObjectURL(file.raw)
      this.$refs.Form.validateField('fileUrl')
    },
    post () {
      this.$refs.Form.validate(valid => {
        if (valid) {
          this.$refs.upload.submit()
          let time = setInterval(() => {
            this.imgSuccessTime--
            if (this.imgSuccessTime < 0) {
              clearInterval(time)
              // tips图片上传失败
            }
            if (this.imageUrl) {
              // console.log(this.imageUrl)
              console.log(this.content)
              // tips图片上传成功
              clearInterval(time)
            }
          }, 1000)
        } else {
          return false
        }
      })
    }
  },
  beforeDestroy () {
    window.onresize = null
  }
}
</script>

<style scoped>
.body {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
.body .form {
  padding: 20px 20px 0 20px;
  overflow: hidden;
  box-sizing: border-box;
  flex: 0 0 auto;
}
.body > .tinymce {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
}
.form >>> .el-input {
  max-width: 300px;
}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader >>> .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar-uploader >>> .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
