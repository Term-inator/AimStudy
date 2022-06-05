import axios from '@/utils/axios.js'

/**
 * listDepartment
 */
export function listDepartment(data){
  console.log(data)
  return axios({
    url: '/api/admin/department',
    method: 'get',
    params: data
  })
}

/**
 * addDepartment
 */
export function addDepartment(data){
  return axios({
    url: '/api/admin/department',
    method: 'post',
    data: data
  })
}

/**
 * updateDepartment
 */
export function updateDepartment(data){
  return axios({
    url: '/api/admin/department',
    method: 'put',
    data: data
  })
}

/**
 * deleteDepartment
 */
export function deleteDepartment(data){
  return axios({
    url: '/api/admin/department',
    method: 'delete',
    data: data
  })
}
