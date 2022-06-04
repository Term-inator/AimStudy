import axios from '@/utils/axios.js'

/**
 * 查询所有院系
 */
export function listDepartment(data){
  return axios({
    url: '/api/department',
    method: 'get',
    params: data
  })
}
