import axios from '@/utils/axios.js'

/**
 * 获取当前用户意愿值
 */
export function getBean(){
  return axios({
    url: '/api/bean',
    method: 'get'
  })
}
