<template>
      <el-card class="box-card card" style="margin-top:10px">
        <div slot="header" class="clearfix">
             <span style="font-size: 14px;">Excel导出筛选</span>
            <div>
                <el-button-group >
                    <el-button type="primary" size="mini" @click="test" icon="el-icon-download"></el-button>
                    <TableResetButton v-model="TableColumn" :keyMap="keyMap"/>
                </el-button-group>
            </div>
        </div>
        <div class="content">
          <el-table ref="table" :data="list" v-loading="loadingTable" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" :row-style="{height:'20px'}" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :cell-style="{padding:'0px'}" border style="width: 100%" height="400">
                <el-table-column align="center" prop="reportNumber" label="报告编号" width="130" v-if="TableColumn.reportNumber">
                </el-table-column>
                <el-table-column align="center" prop="controlWorkNumber" label="工作控制号" width="130" v-if="TableColumn.controlWorkNumber">
                </el-table-column>
                <!-- filter-method="formatteTime" -->
                <el-table-column align="center" prop="sheetWorkFlowDt" label="申请日期" min-width="160" v-if="TableColumn.sheetWorkFlowDt">
                </el-table-column>
                <el-table-column align="center" prop="projectType" label="项目类别" width="110" v-if="TableColumn.projectType">
                </el-table-column>
                <el-table-column align="center" prop="projectContent" label="项目内容" min-width="110" v-if="TableColumn.projectContent">
                </el-table-column>
                <el-table-column align="center" prop="projectCharge" label="项目负责人" width="120" v-if="TableColumn.projectCharge">
                </el-table-column>
                <el-table-column align="center" prop="projectMember" label="项目组成员" width="120" v-if="TableColumn.projectMember">
                </el-table-column>
                <el-table-column prop="projectStartDt"  label="项目计划起始时间" width="140" v-if="TableColumn.projectStartDt">
                </el-table-column>
                <el-table-column prop="projectSite" label="项目地点" width="200" v-if="TableColumn.projectSite">
                </el-table-column>
                <el-table-column prop="businessDepartment" label="业务部门" width="120" v-if="TableColumn.businessDepartment">
                    <template slot-scope="scope">
                        <span v-if="scope.row.businessDepartment === 5">检验业务部</span>
                        <span v-else-if="scope.row.businessDepartment === 1">技术咨询部</span>
                        <span v-else-if="scope.row.businessDepartment === 2">行政财务部</span>
                        <span v-else-if="scope.row.businessDepartment === 3">顺海公司</span>
                        <span v-else-if="scope.row.businessDepartment === 4">检验业务部(惠州)</span>
                        <span v-else>不适用</span>
                    </template>
                </el-table-column>
                <el-table-column prop="entrustedInfoName" label="委托方名称" width="120" v-if="TableColumn.entrustedInfoName">
                </el-table-column>
                <el-table-column prop="entrustedEngineerName" label="委托方工程师" width="120" v-if="TableColumn.entrustedEngineerName">
                </el-table-column>
                <el-table-column align="center" prop="entrustedEngineerTel" label="委托方联系电话" width="200" v-if="TableColumn.entrustedEngineerTel">
                </el-table-column>
                <el-table-column align="center" prop="contractNumber" label="合同编号" width="120" v-if="TableColumn.contractNumber">
                </el-table-column>
                <el-table-column align="center" prop="contractName" label="合同名称" width="120" v-if="TableColumn.contractName">
                </el-table-column>
                <el-table-column align="center" prop="contractMoney" label="合同金额" width="120" v-if="TableColumn.contractMoney">
                </el-table-column>
                <el-table-column align="center" prop="contractStaple" label="合同主要内容" width="200" v-if="TableColumn.contractStaple">
                </el-table-column>
                <el-table-column align="center" label="订单类型" width="100" v-if="TableColumn.orderType">
                    <template slot-scope="scope">
                        <span v-if="scope.row.orderType === 0">订单</span>
                        <span v-else-if="scope.row.orderType === 1">非正式订单(口头/书面)</span>
                        <span v-else>无订单</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="订单编号" width="130" v-if="TableColumn.orderNumber">
                    <template slot-scope="scope">
                        <template v-if="scope.row.orderType === 0">
                            <span v-if="scope.row.orderNumber">
                                {{ scope.row.orderNumber }}
                            </span>
                            <span v-else>无订单</span>
                        </template>
                    <template v-else-if="scope.row.orderType === 1">
                            <span v-if="scope.row.orderNumber">
                                {{ scope.row.orderNumber }}
                            </span>
                            <span v-else>无订单</span>
                        </template>
                    <template v-else>
                            无订单
                        </template>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="orderName" label="订单名称" width="150" v-if="TableColumn.sheetWorkFlowDt">
                    <template slot-scope="scope">
                        <template v-if="scope.row.orderType === 0">
                            <span v-if="scope.row.orderName">
                                {{ scope.row.orderName }}
                            </span>
                            <span v-else>无订单</span>
                        </template>
                    <template v-else-if="scope.row.orderType === 1">
                            <span v-if="scope.row.orderName">
                                {{ scope.row.orderName }}
                            </span>
                            <span v-else>无订单</span>
                        </template>
                    <template v-else>
                            无订单
                        </template>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="订单金额" width="110" v-if="TableColumn.orderMoney">
                    <template slot-scope="scope">
                        <template v-if="scope.row.orderType === 0">
                            <span v-if="scope.row.orderMoney">
                                {{ scope.row.orderMoney }}
                            </span>
                            <span v-else>无订单</span>
                        </template>
                    <template v-else-if="scope.row.orderType === 1">
                            <span v-if="scope.row.orderMoney">
                                {{ scope.row.orderMoney }}
                            </span>
                            <span v-else>无订单</span>
                        </template>
                    <template v-else>
                            无订单
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="startActualTime" align="center" label="项目实际开工时间" width="170" v-if="TableColumn.startActualTime">
                </el-table-column>
                <el-table-column prop="endActualTime" align="center" label="项目实际完工时间" width="170" v-if="TableColumn.endActualTime">
                </el-table-column>
                <el-table-column prop="endActualContent" align="center" label="项目实际完成内容" width="170" v-if="TableColumn.endActualContent">
                </el-table-column>
                <el-table-column prop="projectCheckTime" align="center" label="报告审核日期" min-width="170" v-if="TableColumn.projectCheckTime">
                </el-table-column>
                <el-table-column prop="actualAmount" align="center" label="实收金额" width="120" v-if="TableColumn.actualAmount">
                </el-table-column>
                <el-table-column label="是否外协" width="120" align="center" v-if="TableColumn.ifSubpackage">
                    <template slot-scope="scope">
                        <span v-if="scope.row.ifSubpackage === 0">无</span>
                        <span v-else-if="scope.row.ifSubpackage === 1">设备外协</span>
                        <span v-else-if="scope.row.ifSubpackage === 2">人员外协</span>
                        <span v-else>不适用</span>
                    </template>
                </el-table-column>
                <el-table-column label="外协原因" header-align="center" min-width="150" v-if="TableColumn.subcontractReason">
                    <template slot-scope="scope">
                        <span v-if="scope.row.subcontractReason">
                            {{scope.row.subcontractReason}}
                        </span>
                        <span v-else>不适用</span>
                    </template>
                </el-table-column>
                <el-table-column prop="subcontractorInfo" label="外协单位" header-align="center" width="150" v-if="TableColumn.subcontractorInfo">
                </el-table-column>
                <el-table-column prop="sheetWorkFlowId" align="center" label="系统流水号" width="100" v-if="TableColumn.sheetWorkFlowId">
                </el-table-column>
            </el-table>
            <execlSelectDialog :visible.sync="SelectVisible" :list="list" v-model="TableColumn"/>
        </div>
       </el-card>
</template>

<script>
import execlSelectDialog from '@/components/element/execlSelectDialog.vue'
import TableResetButton from '@/components/element/TableResetButton.vue'
export default {
  data () {
    return {
      // 显示的表格列
      TableColumn: {
        reportNumber: '报告编号',
        controlWorkNumber: '工作控制号',
        sheetWorkFlowDt: '申请日期',
        projectType: '项目类别',
        projectContent: '项目内容',
        projectCharge: '项目负责人',
        projectMember: '项目组成员',
        projectStartDt: '项目计划起始时间',
        projectSite: '项目地点',
        businessDepartment: '业务部门',
        entrustedInfoName: '委托方名称',
        entrustedEngineerName: '委托方工程师',
        entrustedEngineerTel: '委托方联系电话',
        contractNumber: '合同编号',
        contractName: '合同名称',
        contractMoney: '合同金额',
        contractStaple: '合同主要内容',
        orderType: '订单类型',
        orderNumber: '订单编号',
        orderName: '订单名称',
        orderMoney: '订单金额',
        // orderStaple: '订单主要内容',
        startActualTime: '项目实际开工时间',
        endActualTime: '项目实际完工时间',
        endActualContent: '项目实际完工内容',
        projectCheckTime: '项目报告审核日期',
        actualAmount: '预收金额',
        fileStartDt: '归档日期',
        // fileNumber: '归档卷号',
        // invoiceNumber: '发票编号',
        // invoiceTime: '发票日期',
        // invoiceMoney: '开票金额（合计）',
        ifSubpackage: '是否外协',
        // subcontractorName: '外协名称',
        // subcontractorMoney: '外协金额',
        subcontractReason: '外协原因',
        subcontractorInfo: '外协单位'
        // sheetWorkFlowApplicant: '流程单申请人',
        // ifCnas: '是否是CNAS项目',
        // sheetWorkFlowId: '系统流水号'
      },
      // 选中导出列弹框
      SelectVisible: false,
      loadingTable: false,
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
        entrustedEngineerTel: '委托方工程师联系电话',
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

      },
      list: [
        {
          actualAmount: '8000000',
          businessDepartment: 3,
          contractMoney: '19900',
          contractName: '保护区船艇维修',
          contractNumber: 'CCSIStest',
          contractStaple: 'teste',
          controlWorkNumber: 'CCSIStest',
          endActualContent: '测试vessels05',
          endActualTime: '2020-05-30',
          entrustedEngineerName: '测试 委托方',
          entrustedEngineerTel: '13822594682',
          entrustedInfoName: 'Blue Whale Offshore Pte.,Ltd',
          fileNumber: '',
          fileStartDt: '',
          ifCnas: 1,
          ifSubpackage: 0,
          invoiceMoney: '1111.00',
          invoiceNumber: '撒旦撒',
          invoiceState: 1,
          invoiceTime: '2020-06-02 00:00:00',
          orderMoney: '',
          orderName: '',
          orderNumber: '',
          orderStaple: '',
          orderType: '',
          projectCharge: '撒旦撒',
          projectCheckTime: '2020-05-30',
          projectContent: '测试vessels05',
          projectMember: '撒旦撒',
          projectSite: '测试vessels05',
          projectStartDt: '2020-05-01',
          projectType: 'JC检测',
          reportNumber: 'CCSISZ200427',
          reportStartDt: '',
          sheetWorkFlowApplicant: 'admin',
          sheetWorkFlowDt: '2020-05-25 20:42:18',
          sheetWorkFlowId: 493,
          startActualTime: '2020-05-26',
          subcontractReason: '',
          subcontractorInfo: '',
          subcontractorMoney: '',
          subcontractorName: '深圳市test有限公司'
        },
        {
          actualAmount: '8000000',
          businessDepartment: 3,
          contractMoney: '19900',
          contractName: '保护区船艇维修',
          contractNumber: 'CCSIStest',
          contractStaple: 'teste',
          controlWorkNumber: 'CCSIStest',
          endActualContent: '测试vessels05',
          endActualTime: '2020-05-30',
          entrustedEngineerName: '测试 委托方',
          entrustedEngineerTel: '13822594682',
          entrustedInfoName: 'Blue Whale Offshore Pte.,Ltd',
          fileNumber: '',
          fileStartDt: '',
          ifCnas: 1,
          ifSubpackage: 0,
          invoiceMoney: '1111.00',
          invoiceNumber: '撒旦撒',
          invoiceState: 1,
          invoiceTime: '2020-06-02 00:00:00',
          orderMoney: '',
          orderName: '',
          orderNumber: '',
          orderStaple: '',
          orderType: '',
          projectCharge: '撒旦撒',
          projectCheckTime: '2020-05-30',
          projectContent: '测试vessels05',
          projectMember: '撒旦撒',
          projectSite: '测试vessels05',
          projectStartDt: '2020-05-01',
          projectType: 'JC检测',
          reportNumber: 'CCSISZ200427',
          reportStartDt: '',
          sheetWorkFlowApplicant: 'admin',
          sheetWorkFlowDt: '2020-05-25 20:42:18',
          sheetWorkFlowId: 493,
          startActualTime: '2020-05-26',
          subcontractReason: '',
          subcontractorInfo: '',
          subcontractorMoney: '',
          subcontractorName: '深圳市test有限公司'
        },
        {
          actualAmount: '8000000',
          businessDepartment: 3,
          contractMoney: '19900',
          contractName: '保护区船艇维修',
          contractNumber: 'CCSIStest',
          contractStaple: 'teste',
          controlWorkNumber: 'CCSIStest',
          endActualContent: '测试vessels05',
          endActualTime: '2020-05-30',
          entrustedEngineerName: '测试 委托方',
          entrustedEngineerTel: '13822594682',
          entrustedInfoName: 'Blue Whale Offshore Pte.,Ltd',
          fileNumber: '',
          fileStartDt: '',
          ifCnas: 1,
          ifSubpackage: 0,
          invoiceMoney: '1111.00',
          invoiceNumber: '撒旦撒',
          invoiceState: 1,
          invoiceTime: '2020-06-02 00:00:00',
          orderMoney: '',
          orderName: '',
          orderNumber: '',
          orderStaple: '',
          orderType: '',
          projectCharge: '撒旦撒',
          projectCheckTime: '2020-05-30',
          projectContent: '测试vessels05',
          projectMember: '撒旦撒',
          projectSite: '测试vessels05',
          projectStartDt: '2020-05-01',
          projectType: 'JC检测',
          reportNumber: 'CCSISZ200427',
          reportStartDt: '',
          sheetWorkFlowApplicant: 'admin',
          sheetWorkFlowDt: '2020-05-25 20:42:18',
          sheetWorkFlowId: 493,
          startActualTime: '2020-05-26',
          subcontractReason: '',
          subcontractorInfo: '',
          subcontractorMoney: '',
          subcontractorName: '深圳市test有限公司'
        },
        {
          actualAmount: '8000000',
          businessDepartment: 3,
          contractMoney: '19900',
          contractName: '保护区船艇维修',
          contractNumber: 'CCSIStest',
          contractStaple: 'teste',
          controlWorkNumber: 'CCSIStest',
          endActualContent: '测试vessels05',
          endActualTime: '2020-05-30',
          entrustedEngineerName: '测试 委托方',
          entrustedEngineerTel: '13822594682',
          entrustedInfoName: 'Blue Whale Offshore Pte.,Ltd',
          fileNumber: '',
          fileStartDt: '',
          ifCnas: 1,
          ifSubpackage: 0,
          invoiceMoney: '1111.00',
          invoiceNumber: '撒旦撒',
          invoiceState: 1,
          invoiceTime: '2020-06-02 00:00:00',
          orderMoney: '',
          orderName: '',
          orderNumber: '',
          orderStaple: '',
          orderType: '',
          projectCharge: '撒旦撒',
          projectCheckTime: '2020-05-30',
          projectContent: '测试vessels05',
          projectMember: '撒旦撒',
          projectSite: '测试vessels05',
          projectStartDt: '2020-05-01',
          projectType: 'JC检测',
          reportNumber: 'CCSISZ200427',
          reportStartDt: '',
          sheetWorkFlowApplicant: 'admin',
          sheetWorkFlowDt: '2020-05-25 20:42:18',
          sheetWorkFlowId: 493,
          startActualTime: '2020-05-26',
          subcontractReason: '',
          subcontractorInfo: '',
          subcontractorMoney: '',
          subcontractorName: '深圳市test有限公司'
        }
      ]
    }
  },
  methods: {
    generateWorkflow () {

    },
    test () {
      this.SelectVisible = true
    }
  },
  components: {
    execlSelectDialog,
    TableResetButton
  },
  watch: {
    TableColumn (newValue) {
      console.log(newValue)
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    }
  }
}
</script>

<style scoped>
.card >>> .el-card__header .clearfix{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.circle{
    padding: 5px/*no*/;
}
.card >>> .el-card__body{
    width: auto;
    padding: 0;
}
.card .content{
    margin: 0 auto;
}
</style>
