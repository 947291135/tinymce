
// blob转Base64
export const blobToBase64 = blob => {
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
}
// blob转File
export const blobToFile = (bolb, filename) => {
  return new Promise((resolve, reject) => {
    try {
      let file = new File([bolb], filename)
      resolve(file)
    } catch (error) {
      reject(error)
    }
  })
}
// 将base64转换为文件对象(File/Blob)
export const Base64ToFileOrBlob = (dataurl, filename, type = 'file') => {
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
}

// 文件下载
export const FileUpload = (file, filename) => {
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
