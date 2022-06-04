import axios from '@/utils/axios.js'

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
