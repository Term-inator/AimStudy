import axios from '@/utils/axios.js'

/**
 * 重置所有学生意愿值为默认意愿值(100)
 */
export function resetBean(){
  return axios({
    url: '/api/admin/bean/reset-bean',
    method: 'post'
  })
}
