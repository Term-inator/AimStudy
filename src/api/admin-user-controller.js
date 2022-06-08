import axios from '@/utils/axios.js'

/**
 * listUser
 */
export function listUser(data){
  console.log(data)
  return axios({
    url: '/api/admin/user',
    method: 'get',
    params: data
  })
}

/**
 * addUser
 */
export function addUser(data){
  return axios({
    url: '/api/admin/user',
    method: 'post',
    data: data
  })
}

/**
 * updateUser
 */
export function updateUser(data){
  return axios({
    url: '/api/admin/user',
    method: 'put',
    data: data
  })
}

/**
 * deleteUser
 */
export function deleteUser(data){
  return axios({
    url: '/api/admin/user',
    method: 'delete',
    data: data
  })
}

/**
 * resetPassword
 */
export function resetPassword(data){
  return axios({
    url: '/api/admin/user/reset-password',
    method: 'post',
    data: data
  })
}
