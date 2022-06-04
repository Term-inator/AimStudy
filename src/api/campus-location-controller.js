import axios from '@/utils/axios.js'

/**
 * 查询所有校区
 */
export function listCampusLocation(){
  return axios({
    url: '/api/campus-location',
    method: 'get'
  })
}
