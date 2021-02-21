<template>
    <div class="upload">
         <el-row>
            <el-form ref="form"  label-width="80px">
                <el-form-item label="上传列表">
                    <el-upload
                        class="upload-demo"
                        :action="actionUrl"
                        accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success='success'
                        :before-upload='beforeupload'
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过2M</div>
                    </el-upload>
                </el-form-item>
                    <el-table
                        size='mini'
                        :data="successList"
                        style="width: 100%;text-align: center;">
                        <el-table-column
                            prop="date"
                            sortable
                            label="日期">
                        </el-table-column>
                        <el-table-column
                            prop="key"
                            label="url">
                        </el-table-column>
                        <el-table-column
                            prop="hash"
                            label="hash">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="120">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="ClickRow(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                    复制链接
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
            </el-form>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      fileList: [],
      successList: []
    }
  },
  methods: {
    handlePreview (file) {
      console.log(file)
    },
    handleRemove (file, fileList) {
      console.log(file)
    },
    success (response, file, fileList) {
      if (response.type === 'success') {
        this.successList.push(response.body)
      } else {
        fileList.pop()
      }
    },
    ClickRow (index, data) {
      var input = document.createElement('input')
      input.value = data.key
      document.body.appendChild(input)
      input.select()
      input.setSelectionRange(0, input.value.length)
      document.execCommand('Copy')
      document.body.removeChild(input)
      this.$message({
        type: 'success',
        message: '复制成功'
      })
    },
    beforeupload (file) {
      let type = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'GIF']
      let selectType = file.name.split('.')[1] // 上传的图片类型
      const is1M = file.size / 1024 / 1024 < 2 // 限制小于1M
      let typeBoolen = this.js_in_array(selectType, type)
      if (!typeBoolen) {
        this.$message.error('文件类型错误')
        return false
      }
      if (!is1M) {
        this.$message.error('文件大小超出2M')
        return false
      }
    },
    js_in_array (value, arr) {
      for (var i in arr) {
        if (arr[i] === value) {
          return true
        }
      }
      return false
    }
  },
  computed: {
    actionUrl () {
      return process.env.UPLOAD_URL
    }
  }
}
</script>

<style scoped>
.upload{
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
}
</style>
