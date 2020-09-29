<!--导出execl 选择导出关键字-->
<template>
    <el-dialog
        title="选择需要导出项"
        :visible.sync="show"
        append-to-body
        width="60%"
        :before-close="handleClose">
                <el-transfer
                    filterable
                    :titles='["未选择数据","已选择数据"]'
                    filter-placeholder="请输入导出数据列"
                    v-model="form.type"
                    :data="listDate">
                </el-transfer>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="updata">修改表格显示</el-button>
            <el-button type="primary" @click="submit">导出Excel</el-button>
        </span>
    </el-dialog>
</template>

<script>
import XLSX from 'xlsx'
export default {
  data () {
    return {
      form: {type: []},
      keyMap: {
        /**
                             * 报告编号
                             */
        reportNumber: '报告编号',
        /**
                             * 工作控制号
                             */
        controlWorkNumber: '工作控制号',
        /**
                             * 申请日期
                             */
        sheetWorkFlowDt: '申请日期',
        /**
                             * 项目类别
                             */
        projectType: '项目类别',
        /**
                             * 业务部门
                             */
        businessDepartment: '业务部门',
        /**
                             * 委托方名称
                             */
        entrustedInfoName: '委托方名称',
        /**
                             * 项目内容
                             */
        projectContent: '项目内容',
        /**
                             * 项目负责人
                             */
        projectCharge: '项目负责人',
        /**
                             * 项目组成员
                             */
        projectMember: '项目组成员',
        /**
                             * 项目计划起始时间
                             */
        projectStartDt: '项目计划起始时间',
        /**
                             * 项目地点
                             */
        projectSite: '项目地点',
        /**
                             * 委托方工程师
                             */
        entrustedEngineerName: '委托方工程师',
        /**
                             *联系电话
                                */
        entrustedEngineerTel: '联系电话',
        /**
                             * 合同编号
                             */
        contractNumber: '合同编号',
        /**
                             * 合同名称
                             */
        contractName: '合同名称',
        /**
                             * 合同金额
                             */
        contractMoney: '合同金额',
        /**
                             * 合同主要内容
                             */
        contractStaple: '合同主要内容',
        /**
                             * 订单类型
                             */
        orderType: '订单类型',
        /**
                             * 订单编号
                             */
        orderNumber: '订单编号',
        /**
                             * 订单名称
                             */
        orderName: '订单名称',
        /**
                             * 订单金额
                             */
        orderMoney: '订单金额',
        /**
                             * 订单主要内容
                             */
        orderStaple: '订单主要内容',
        /**
                             * 项目实际开工时间
                             */
        startActualTime: '项目实际开工时间',
        /**
                             * 项目实际完工时间
                             */
        endActualTime: '项目实际完工时间',
        /**
                             * 项目实际完工内容
                             */
        endActualContent: '项目实际完工内容',
        /**
                             * 项目报告审核日期
                             */
        projectCheckTime: '项目报告审核日期',
        /**
                             * 归档日期
                             */
        fileStartDt: '归档日期',
        /**
                             * 档案编号
                             */
        fileNumber: '归档卷号',
        /**
                             * 发票编号
                             */
        invoiceNumber: '发票编号',
        /**
                             * 发票日期
                             */
        invoiceTime: '发票日期',
        /**
                             * 开票金额（合计）
                             */
        invoiceMoney: '开票金额（合计）',
        /**
                             * 是否外协
                             */
        ifSubpackage: '是否外协',
        /**
                             * 外协名称
                             */
        subcontractorName: '外协名称',
        /**
                             * 外协金额
                             */
        subcontractorMoney: '外协金额',
        /**
                             * 流程单申请人
                             */
        sheetWorkFlowApplicant: '流程单申请人',
        /**
                             * 是否是CNAS项目
                             */
        ifCnas: '是否是CNAS项目'

      }
    }
  },
  model: {
    prop: 'HeaderList',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 表格要显示的数据
    HeaderList: {
      type: Object,
      default () {
        return {}
      }
    },
    // 表格数据
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    visible (newValue) {
      if (newValue) {
        // 每次显示 都获取表格默认显示的数据赋值给组件默认选中
        this.form.type = this.type
      }
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    },
    listDate () {
      let arr = []
      for (const key in this.keyMap) {
        arr.push({
          label: this.keyMap[key],
          key: key,
          isCheck: true
        })
      }
      return arr
    },
    type: {
      get () {
        let list = []
        for (const key in this.HeaderList) {
          list.push(key)
        }
        return list
      },
      set (e) {
        this.$emit('change', JSON.parse(JSON.stringify(this.keyMap, e)))
      }
    }
  },
  methods: {
    handleClose () {
      // this.form.type = []
      this.show = false
    },
    submit () {
      // 获取选中数据，根据选中数据充当头部
      let header = this.form.type
      //   如果未选中数据则全部数据导出
      if (header.length <= 0) {
        let AllIn = []
        for (const key in this.keyMap) {
          AllIn.push(key)
        }
        header = AllIn
      }
      //   获取选中数据value映射
      let headerDisplay = {}
      for (const key in this.keyMap) {
        if (header.includes(key)) {
          headerDisplay[key] = this.keyMap[key]
        }
      }
      //   数据合并
      const data = JSON.parse(JSON.stringify(this.list, header))
      data.forEach(item => {
        //   业务部门
        if (item.businessDepartment) {
          item.businessDepartment = this.formatterBusinessDepartment(item.businessDepartment)
        }
        // 是否外协
        if (item.ifSubpackage) {
          item.ifSubpackage = this.formatterIfSubpackage(item.ifSubpackage)
        }
        // 订单类型
        if (item.orderType) {
          item.orderType = this.formatterOrderType(item.orderType)
        }
      })
      const newData = [headerDisplay, ...data]
      //   导出excel
      let worksheet = XLSX.utils.json_to_sheet(newData, {header: header, skipHeader: true})
      this.openDownloadDialog(this.sheet2blob(worksheet), '总台账.xlsx')
    },
    sheet2blob (sheet, sheetName) {
      sheetName = sheetName || 'sheet1'
      var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
      }
      workbook.Sheets[sheetName] = sheet
      // 生成excel的配置项
      var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
      }
      var wbout = XLSX.write(workbook, wopts)
      var blob = new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' })
      // 字符串转ArrayBuffer

      return blob
    },
    s2ab (s) {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
      return buf
    },
    openDownloadDialog (url, saveName) {
      if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url) // 创建blob地址
      }
      var aLink = document.createElement('a')
      aLink.href = url
      aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      var event
      if (window.MouseEvent) event = new MouseEvent('click')
      else {
        event = document.createEvent('MouseEvents')
        event.initMouseEvent(
          'click',
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        )
      }
      aLink.dispatchEvent(event)
    },
    // 表格显示数据更改
    updata () {
      this.type = this.form.type
    },
    // 格式化数据 到时候从工具类拿
    formatterBusinessDepartment (val) {
      return {
        '5': '检验业务部',
        '1': '技术咨询部',
        '2': '行政财务部',
        '3': '顺海公司',
        '4': '检验业务部(惠州)'
      }[val] || '不适用'
    },
    formatterIfSubpackage  (val) {
      return {
        '0': '无',
        '1': '设备外协',
        '2': '人员外协'
      }[val] || '不适用'
    },
    formatterOrderType (val) {
      return {
        '0': '订单',
        '1': '非正式订单(口头/书面)'
      }[val] || '未选择'
    }
  }
}
</script>

<style scoped>
 .el-transfer{
    display: flex;
    justify-content: center;
 }
 .el-transfer >>>.el-transfer__buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
 }
 .el-transfer >>>.el-transfer-panel{
     flex: 1 1 auto;
 }
 .el-transfer >>>.el-transfer__buttons button{
     width: 50px; /*no*/
    height: 50px; /*no*/
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-left: 0;
 }
</style>
