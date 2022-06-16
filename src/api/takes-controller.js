import axios from '@/utils/axios.js'

/**
 * 学生已选的课程列表
 */
export function listChoose(data) {
  return axios({
    url: '/api/takes/choose',
    method: 'get',
    params: data
  })
}