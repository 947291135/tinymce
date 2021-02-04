import axios from '@/assets/js/axios.js'
import XLSX from 'xlsx'
export const loadAllMenber = () => {
  let userInfo = [{
    value: 3,
    label: '项目聘用人员',
    children: []
  }, {
    value: 1,
    label: '外协人员',
    children: []
  }, {
    value: 2,
    label: '内部人员',
    children: [{
      value: 5,
      label: '检验业务部',
      children: []
    }, {
      value: 1,
      label: '技术咨询部',
      children: []
    }, {
      value: 2,
      label: '行政财务部',
      children: []
    }, {
      value: 3,
      label: '顺海公司',
      children: []
    }, {
      value: 4,
      label: '检验业务部(惠州)',
      children: []
    }]
  }]
  // 查询所有项目聘用人员
  axios.post('/user/getEmployeeNameList', {
    'employeeType': 3
  }).then(
    resp => {
      resp.model.forEach(item => {
        let user = {
          label: item.employeeName,
          value: item.employeeId
        }
        userInfo[0].children.push(user)
      })
    }).catch(err => {
    console.log(err)
    return err
  })

  axios.post('/user/getEmployeeNameList', {
    'employeeType': 1
  }).then(
    resp => {
      resp.model.forEach(item => {
        let user = {
          label: item.employeeName,
          value: item.employeeId
        }
        userInfo[1].children.push(user)
      })
    }).catch(err => {
    console.log(err)
    return err
  })

  // 查询内部员工 检验业务部
  axios.post('/user/getEmployeeNameList', {
    'employeeType': 2
  }).then(
    resp => {
      resp.model.forEach(item => {
        let user = {
          label: item.employeeName,
          value: item.employeeId
        }
        // 检验业务部
        if (item.employeeSection === 0) {
          userInfo[2].children[0].children.push(user)
        } else if (item.employeeSection === 1) {
          userInfo[2].children[1].children.push(user)
        } else if (item.employeeSection === 2) {
          userInfo[2].children[2].children.push(user)
        } else if (item.employeeSection === 3) {
          userInfo[2].children[3].children.push(user)
        } else if (item.employeeSection === 4) {
          userInfo[2].children[4].children.push(user)
        }
        this.menberList = userInfo
      })
    }).catch(err => {
    console.log(err)
    return err
  })
  return userInfo
}

// 为项目组成员 添加所在的部门以及属性
export const formatterExamineInfo = projectMemberList => {
  return projectMemberList.map(item => {
    if (item.memberType === 2) {
      item.menberTypeName = '内部员工'
      item.departmentName = {
        '5': '检验业务部',
        '1': '技术咨询部',
        '2': '行政财务部',
        '3': '顺海公司',
        '4': '检验业务部(惠州)'
      }[item.projectSection] || '不适用'
    } else if (item.memberType === 1) {
      item.menberTypeName = '外协人员'
    } else if (item.memberType === 3) {
      item.menberTypeName = '项目聘用人员'
    }
    return item
  })
}

export const sheet2blob = (sheet, sheetName) => {
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
  var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  // 字符串转ArrayBuffer

  return blob
}
function s2ab (s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}
export const openDownloadDialog = (url, saveName) => {
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
}

// 格式化业务部门
export const formatterBusinessDepartment = val => {
  return {
    '5': '检验业务部',
    '1': '技术咨询部',
    '2': '行政财务部',
    '3': '顺海公司',
    '4': '检验业务部(惠州)'
  }[val] || '不适用'
}

// 格式化订单状态（是否使用）
export const formatterOrderLabel = val => {
  return {
    '0': '已关闭',
    '1': '可重新申请'
  }[val] || '已通过'
}
// 订单类型
export const formatterOrderType = val => {
  return {
    '0': '订单',
    '1': '非正式订单(口头/书面)'
  }[val] || '未选择'
}

// 格式化外协类型
export const formatterIfSubpackage = val => {
  return {
    '0': '无',
    '1': '设备外协',
    '2': '人员外协'
  }[val] || '不适用'
}

// 生成随机hash 默认16位
export function createHash (hashLength) {
  if (!hashLength || typeof (Number(hashLength)) !== 'number') { hashLength = 16 }
  var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  var hs = []
  var hl = Number(hashLength)
  var al = ar.length
  for (var i = 0; i < hl; i++) {
    hs.push(ar[Math.floor(Math.random() * al)])
  }

  return hs.join('')
}

// 日期格式化
export function parseTime (time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timestr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timestr
}

// 判断是否是URL
export function isURL (val) {
  return /^(http|https)/.test(val)
}
