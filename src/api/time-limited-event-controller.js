import axios from '@/utils/axios.js'

/**
 * 查询事件信息
 */
export function getEvent(data){
  return axios({
    url: '/api/event',
    method: 'get',
    params: data
  })
}

/**
 * 更新事件信息
 */
export function updateEvent(data){
  return axios({
    url: '/api/event',
    method: 'post',
    data: data
  })
}
