import axios from '@/utils/axios.js'
import original_axios from 'axios'
import store from '@/store'

/**
 * 上传文件
 */
export function uploadFile(data){
  return axios({
    url: '/api/file',
    method: 'post',
    data: data
  })
}

/**
 * 删除文件
 */
export function deleteFile(data){
  return axios({
    url: '/api/file',
    method: 'delete',
    data: data
  })
}


/**
 * 下载文件
 */
export function downloadFile(syllabusPath) {
  // 魔法值 25 当前文件格式决定了该值的大小
  const filename = syllabusPath.substring(25)
  original_axios.request({
    url: `https://aimstudy.neptu.cn/file/${syllabusPath}`,
    headers: { 'x-auth-token': store.state.user.token },
    responseType: 'blob'
  }).then(res => {
    console.log(res)
    const blob = new Blob([res.data], { type: res.data.type })
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  })
}