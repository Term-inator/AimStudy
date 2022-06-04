import axios from '@/utils/axios.js'

/**
 * 教师查看所教的课程
 */
export function viewTeaches(data){
  return axios({
    url: '/api/teaches/viewTeaches',
    method: 'post',
    data: data
  })
}
